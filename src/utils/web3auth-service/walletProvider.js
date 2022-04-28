import { SafeEventEmitterProvider } from "@web3auth/base";
import ethProvider from "./ethProvider";
import solanaProvider from "./solanaProvider";

// export interface IWalletProvider {
//   getAccounts: () => Promise<any>;
//   getBalance: () => Promise<any>;
//   signAndSendTransaction: () => Promise<void>;
//   signTransaction: () => Promise<void>;
//   signMessage: () => Promise<void>;
// }

export const getWalletProvider = (chain, provider, uiConsole) => {
  if (chain === "solana") {
    return solanaProvider(provider, uiConsole);
  }
  return ethProvider(provider, uiConsole);
};
