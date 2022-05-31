import { ethers } from "ethers";
import {
  tokenCost,
  receiverAddress,
  contractAddress,
} from "../config/tokenTransferData";
import { usdtABI } from "../contract_abi/usdcABi";
import { erc20ABI } from "../contract_abi/erc20Abi";
import { notify } from "./notification";
import {
  changeWeb3AuthChain,
  currentWeb3AuthChain,
  getWeb3AuthProvider,
} from "./web3auth";

export async function SendTransaction() {
  const send_abi = usdtABI;
  const web3provider = await getWeb3AuthProvider();
  const provider = new ethers.providers.Web3Provider(web3provider);

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
    return txResponse;
  } catch (error) {
    notify(error["data"]["message"], "error");

    return false;
  }
}

async function getContractInfo() {
  let currentChain = currentWeb3AuthChain;
  let contractObj = contractAddress.filter(
    (chain) => chain.chain === currentChain
  );
  return contractObj[0];
}

export const getCoinBalance = async (coinAddress) => {
  let currentChain = currentWeb3AuthChain;
  let balance = 0;
  if (currentChain === "ethereum") {
    const ERC20ABI = erc20ABI;
    const web3provider = await getWeb3AuthProvider();
    const tokenContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
    const provider = new ethers.providers.Web3Provider(web3provider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      tokenContractAddress,
      ERC20ABI,
      signer
    );
    const address = await signer.getAddress();
    balance = (await contract.balanceOf(address)).toString();
  } else {
    // changeWeb3AuthChain("ethereum");
  }
  return balance;
};