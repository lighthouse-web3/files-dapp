import lighthouse from "lighthouse-web3";
import { lighthouseAbi } from "../contract_abi/lighthouseAbi";
import { ethers } from "ethers";
import axios from "axios";
import { getChainNetwork } from "./chainNetwork";
import { notify } from "./notification";
import { getAddress, getSignMessage } from "./auth";
import { baseUrl } from "../config/urls";
import { web3auth } from "./web3auth";

export const sign_message = async () => {
  const web3provider = await web3auth.connect();
  const provider = new ethers.providers.Web3Provider(web3provider);
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const res = await axios.get(
    `${baseUrl}/api/auth/get_message?publicKey=${address}`
  );
  const message = res.data;
  const signed_message = await signer.signMessage(message);
  return {
    message: message,
    signed_message: signed_message,
    address: await signer.getAddress(),
  };
};;

export const execute_transaction = async (
  cid,
  fileName,
  fileSize,
  cost,
  network
) => {
  const web3provider = await web3auth.connect();
  const provider = new ethers.providers.Web3Provider(web3provider);
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(network);
  const contract_address = lighthouse.getContractAddress(network);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, lighthouseAbi, signer);
  const txResponse = await contract.store(cid, "", fileName, fileSize, {
    value: ethers.utils.parseEther(cost),
  });
  return txResponse;
};

export const uploadFile = async (
  uploadedFile,
  setUploadProgress,
  _authDetails
) => {
  uploadedFile.persist();
  setUploadProgress(10);
  let network = await getChainNetwork();
  if (network) {
    try {
      setUploadProgress(20);
      let balance = await getBalance();
      if (+balance?.dataUsed < +balance?.dataLimit) {
        setUploadProgress(50);
        let signed_message = await sign_message();
        const deploy_response = await lighthouse.deploy(
          uploadedFile,
          null,
          getAddress(),
          signed_message["signed_message"]
        );
        setUploadProgress(70);
        setUploadProgress(0);
        notify(`File Upload Success:  ${deploy_response?.Hash}`, "success");
      } else {
        setUploadProgress(0);
        notify(`Free Data Usage Exeeded `, "error");
      }
    } catch (e) {
      notify(`ERROR:${e}`, "error");
      setUploadProgress(0);
    }
  } else {
    notify(`Please connect to a supported network`, "error");
  }
};

export const uploadFolder = async (
  uploadedFile,
  setUploadProgress,
  _authDetails
) => {
  uploadedFile.persist();
  let network = await getChainNetwork();
  setUploadProgress(10);
  if (network) {
    try {
      setUploadProgress(20);
      let balance = await getBalance();
      let signed_message = await sign_message();
      if (+balance?.dataUsed < +balance?.dataLimit) {
        setUploadProgress(50);
        const deploy_response = await lighthouse.deploy(
          uploadedFile,
          null,
          getAddress(),
          signed_message["signed_message"]
        );
        setUploadProgress(70);
        let newResponse = deploy_response.split("\n");
        newResponse = JSON.parse(newResponse[newResponse.length - 2]);
        setUploadProgress(100);
        setUploadProgress(0);
        notify(`File Upload Success:\n  ${newResponse?.Hash}`, "success");
      } else {
        setUploadProgress(0);
        notify(`Free Data Usage Exeeded`, "error");
      }
    } catch (e) {
      notify(`ERROR:${e}`, "error");
      setUploadProgress(0);
    }
  } else {
    notify(`Please connect to a supported network`, "error");
  }
};

export const getBalance = async () => {
  const response = await axios.get(
    `${baseUrl}/api/user/user_data_usage?publicKey=${getAddress()}`
  );
  return response["data"];
};
