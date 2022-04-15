import { ethers } from "ethers";
import { notify } from "./notification";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const usdc = {
  address: "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4",
  abi: [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function gimmeSome() external",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
  ],
};

export async function transferUsdc() {
  console.log("inside");
  let receiver = "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4";
  let amount = "1";
  let response;

  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();

  const usdcContract = new ethers.Contract(usdc.address, usdc.abi, signer);

  try {
    receiver = ethers.utils.getAddress(receiver);
  } catch {
    response = `Invalid address: ${receiver}`;
    notify(response, "error");
  }

  try {
    amount = ethers.utils.parseUnits(amount, 6);
    if (amount.isNegative()) {
      throw new Error();
    }
  } catch {
    response = `Invalid amount: ${amount}`;
    notify(response, "error");
  }

  //   const balance = await usdcContract.balanceOf(userAddress);

  //   if (balance.lt(amount)) {
  //     let amountFormatted = ethers.utils.formatUnits(amount, 6);
  //     let balanceFormatted = ethers.utils.formatUnits(balance, 6);
  //     console.error(
  //       `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`
  //     );

  //     response = `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`;
  //     notify(response, "error");
  //   }
  let amountFormatted = ethers.utils.formatUnits(amount, 6);

  response = `Transferring ${amountFormatted} USDC receiver ${receiver.slice(
    0,
    6
  )}...`;
  notify(response, "success");

  const tx = await usdcContract.transfer(receiver, amount, { gasPrice: 20e9 });
  const receipt = await tx.wait();
  response = `Transaction confirmed in block ${receipt.blockNumber}`;
  notify(response, "success");
}
