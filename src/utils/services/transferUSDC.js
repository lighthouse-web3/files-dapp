import { ethers } from "ethers";
import axios from "axios";
import {
  tokenCost,
  receiverAddress,
  contractAddress,
  abiURL,
} from "../config/tokenTransferData";
import { getChainNetwork } from "./chainNetwork";
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

export async function SendTransaction() {
  const abi = (await axios.get(`${abiURL}`)).data;
  const send_abi = JSON.parse(abi.result);
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
  try {
    const txResponse = await contract.transfer(receiverAddress, numberOfTokens);
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);
  } catch (error) {
    console.error(error.code);
  }
}

async function getContractInfo() {
  let currentChain = await getChainNetwork();
  let contractObj = contractAddress.filter(
    (chain) => chain.chain === currentChain
  );
  return contractObj[0];
}

async function getCurrentBlock() {
  let currentBlock = await provider.getBlockNumber();
  console.log(currentBlock);
  return currentBlock;
}

async function getBalance(wallet) {
  let balance = await provider.getBalance(wallet);
  // we use the code below to convert the balance from wei to eth
  balance = ethers.utils.formatEther(balance);
  console.log(balance);
}
