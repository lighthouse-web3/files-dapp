import { ethers } from "ethers";
import { usdcABI } from "../contract_abi/usdcABi";
import { notify } from "./notification";
import { getAddress } from "./auth";
import { useWeb3Transfer, useMoralis } from "react-moralis";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const usdc = {
  address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
  abi: [
    "function gimmeSome() external",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
  ],
};

export async function transferUsdc() {
  SendTransaction();
  // let receiver = "";
  // let amount = "1";
  // let response;

  // await provider.send("eth_requestAccounts", []);
  // const signer = provider.getSigner();
  // let userAddress = await signer.getAddress();

  // const usdcContract = new ethers.Contract(usdc.address, usdc.abi, signer);

  // try {
  //   receiver = ethers.utils.getAddress(receiver);
  // } catch {
  //   response = `Invalid address: ${receiver}`;
  // }

  // try {
  //   amount = ethers.utils.parseUnits(amount, 6);
  //   if (amount.isNegative()) {
  //     throw new Error();
  //   }
  // } catch {
  //   console.error(`Invalid amount: ${amount}`);
  //   response = `Invalid amount: ${amount}`;
  // }

  // let amountFormatted = ethers.utils.formatUnits(amount, 6);

  // response = `Transferring ${amountFormatted} USDC receiver ${receiver.slice(
  //   0,
  //   6
  // )}...`;

  // const tx = await usdcContract.transfer(receiver, amount, { gasPrice: 20e9 });

  // const receipt = await tx.wait();
}

export async function SendTransaction() {
  const send_abi = usdcABI;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
    send_abi,
    signer
  );
  const send_token_amount = "0.001";
  const numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18);

  try {
    const txResponse = await contract.transfer(
      "0xC88C729Ef2c18baf1074EA0Df537d61a54A8CE7b",
      numberOfTokens
    );
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);
  } catch (error) {
    console.error(error.code);
  }
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

