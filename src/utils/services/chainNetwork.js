import Logout from "../logout";
import { notify } from "./notification";

export function getChainNetwork() {
  let network = "fantom-testnet";
  if (window.ethereum.networkVersion === "137") {
    network = "polygon";
  } else if (window.ethereum.networkVersion === "250") {
    network = "fantom";
  } else if (window.ethereum.networkVersion === "56") {
    network = "binance";
  } else if (window.ethereum.networkVersion === "10") {
    network = "optimism";
  } else if (window.ethereum.networkVersion === "4002") {
    network = "fantom-testnet";
  } else if (window.ethereum.networkVersion === "80001") {
    network = "polygon-testnet";
  } else if (window.ethereum.networkVersion === "97") {
    network = "binance-testnet";
  } else if (window.ethereum.networkVersion === "69") {
    network = "optimism-testnet";
  } else {
    network = null;
    notify("Please connect to supported Chain", "error");
  }
  return network;
}
