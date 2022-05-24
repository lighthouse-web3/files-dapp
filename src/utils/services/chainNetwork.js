import { notify } from "./notification";
import { availableNetworks } from "../config/availableNetworks";

export async function getChainNetwork() {
  let network = "fantom-testnet";
  let networkVersion = await window.ethereum.request({ method: "net_version" });
  if (window.ethereum.isConnected()) {
    switch (networkVersion) {
      case "137":
        network = "polygon";
        break;
      case "250":
        network = "fantom";
        break;
      case "56":
        network = "binance";
        break;
      case "10":
        network = "optimism";
        break;
      case "1":
        network = "ethereum";
        break;
      case "4002":
        network = "fantom-testnet";
        break;
      case "80001":
        network = "polygon-testnet";
        break;
      case "97":
        network = "binance-testnet";
        break;
      case "69":
        network = "optimism-testnet";
        break;
      default:
        network = null;
        notify("Please connect to supported Chain", "error");
        break;
    }
  } else {
  }
  return network;
}

export const changeNetwork = async ({ networkName }) => {
  console.log(availableNetworks[networkName]);
  let method =
    networkName === "ethereum"
      ? "wallet_switchEthereumChain"
      : "wallet_addEthereumChain";
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: method,
      params: [
        {
          ...availableNetworks[networkName],
        },
      ],
    });
  } catch (err) {
    notify(err, "error");
  }
};
