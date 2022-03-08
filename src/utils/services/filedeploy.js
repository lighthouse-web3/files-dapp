import lighthouse from "lighthouse-web3";
import { lighthouseAbi } from "../contract_abi/lighthouseAbi";
import { ethers } from "ethers";
import axios from "axios";
import { getChainNetwork } from "./chainNetwork";
import { notify } from "./notification";

export const sign_message = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const res = await axios.get(
    `https://api.lighthouse.storage/api/lighthouse/get_message?publicKey=${address}`
  );
  const message = res.data;
  const signed_message = await signer.signMessage(message);
  return {
    message: message,
    signed_message: signed_message,
    address: await signer.getAddress(),
  };
};

export const execute_transaction = async (
  cid,
  fileName,
  fileSize,
  cost,
  network
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(network);
  const contract_address = lighthouse.getContractAddress(network);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, lighthouseAbi, signer);
  const txResponse = await contract.store(cid, "", fileName, fileSize, {
    value: ethers.utils.parseEther(cost),
  });
  return txResponse;
};

export const deployDir = async (e, address, signed_message) => {
  return new Promise(function (resolve, reject) {
    e.persist();
    const formData = new FormData();
    for (let i = 0; i < e.nativeEvent.path[0].files.length; i++) {
      formData.append(
        "data",
        e.nativeEvent.path[0].files[i],
        e.nativeEvent.path[0].files[i]["name"]
      );
    }

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://node.lighthouse.storage/api/v0/add");

    const token = "Bearer " + address + " " + signed_message;
    xhr.setRequestHeader("Authorization", token);
    console.log("sending");
    xhr.send(formData);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
  });
};

export const uploadFile = async (
  uploadedFile,
  setUploadProgress,
  _authDetails
) => {
  uploadedFile.persist();
  setUploadProgress(10);
  let network = getChainNetwork();
  if (network) {
    try {
      const signing_response = await sign_message();
      setUploadProgress(20);

      console.log(uploadedFile.target.files[0].size);
      console.log(network);
      const cost = (
        await lighthouse.getQuote(uploadedFile.target.files[0].size, network)
      ).totalCost
        .toFixed(18)
        .toString();
      setUploadProgress(50);
      console.log(cost);

      const deploy_response = await lighthouse.deploy(
        uploadedFile,
        signing_response.address,
        signing_response.signed_message
      );
      console.log(deploy_response);
      setUploadProgress(70);

      const transaction = await execute_transaction(
        deploy_response.Hash,
        deploy_response.Name,
        deploy_response.Size,
        cost,
        network
      );

      setUploadProgress(0);
      notify(
        `File Upload Success:\n Transaction Hash: ${transaction?.hash}`,
        "success"
      );
    } catch (e) {
      notify(`ERROR:${e}`, "error");
      setUploadProgress(0);
    }
  } else {
    notify(`Please connect to a supported network`, "error");
    console.log("Please connect to a supported network");
  }
};

export const uploadFolder = async (
  uploadedFile,
  setUploadProgress,
  _authDetails
) => {
  uploadedFile.persist();

  let network = getChainNetwork();
  setUploadProgress(10);

  if (network) {
    try {
      const signing_response = await sign_message();
      setUploadProgress(20);

      let deploy_response = await deployDir(
        uploadedFile,
        signing_response.address,
        signing_response.signed_message
      );
      deploy_response = deploy_response.split("\n");
      deploy_response = JSON.parse(deploy_response[deploy_response.length - 2]);

      console.log("deploy_response");
      console.log(deploy_response);

      const cost = (
        await lighthouse.getQuote(deploy_response.Size, network)
      ).totalCost
        .toFixed(18)
        .toString();

      console.log(cost);
      setUploadProgress(50);

      const transaction = await execute_transaction(
        deploy_response.Hash,
        deploy_response.Name,
        deploy_response.Size,
        cost,
        network
      );
      setUploadProgress(100);
      console.log(transaction);
      setUploadProgress(0);
      notify(
        `File Upload Success:\n Transaction Hash: ${transaction?.hash}`,
        "success"
      );
    } catch (e) {
      notify(`ERROR:${e}`, "error");
      setUploadProgress(0);
    }
  } else {
    notify(`Please connect to a supported network`, "error");
    console.log("Please connect to a supported network");
  }
};
