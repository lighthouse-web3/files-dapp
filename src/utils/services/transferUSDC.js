import { ethers } from "ethers";
import {
  tokenCost,
  receiverAddress,
  contractAddress,
} from "../config/tokenTransferData";
import { getChainNetwork } from "./chainNetwork";
import { usdtABI } from "../contract_abi/usdcABi";
import { notify } from "./notification";

export async function SendTransaction() {
  const send_abi = usdtABI;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let chainInfo = await getContractInfo();
  const contract = new ethers.Contract(
    chainInfo["contractAddress"],
    send_abi,
    signer
  );

  const numberOfTokens = ethers.utils.parseUnits(
    tokenCost,
    chainInfo["decimal"]
  );

  console.log(numberOfTokens, contract);

  try {
    const txResponse = await contract.transfer(receiverAddress, numberOfTokens);
    console.log(txResponse);

    return txResponse;
    // const txReceipt = await txResponse.wait();
    // return txReceipt;
  } catch (error) {
    notify(error["data"]["message"], "error");

    return false;
  }
}

async function getContractInfo() {
  let currentChain = await getChainNetwork();

  let contractObj = contractAddress.filter(
    (chain) => chain.chain === currentChain
  );
  console.log("Chain", contractObj[0]);
  return contractObj[0];
}

// async function getCurrentBlock() {
//   let currentBlock = await provider.getBlockNumber();
//   console.log(currentBlock);
//   return currentBlock;
// }

// async function getBalance(wallet) {
//   let balance = await provider.getBalance(wallet);
//   // we use the code below to convert the balance from wei to eth
//   balance = ethers.utils.formatEther(balance);
//   console.log(balance);
// }
