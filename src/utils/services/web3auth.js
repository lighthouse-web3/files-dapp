import { ADAPTER_EVENTS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { availableNetworks } from "../config/availableNetworks";

let clientId = process.env.REACT_APP_WEB3AUTH_APP_ID;
export var web3auth = undefined;
export var web3authProvider = undefined;
export var currentWeb3AuthChain = "polygon";

export const initWeb3Auth = async () => {
  try {
    const initParams = {};
    const web3AuthCtorParams = {
      clientId,
      chainConfig: getWeb3AuthChainConfig(currentWeb3AuthChain),
      uiConfig: {
        theme: "dark",
        loginMethodsOrder: ["facebook", "google", "github", "discord"],
        appLogo: "/logo.png",
      },
    };
    web3auth = new Web3Auth(web3AuthCtorParams);
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        clientId,
        network: "testnet",
        uxMode: "popup",
        whitelabel: {
          name: "Lighthouse",
          logoLight: "/logo.png",
          logoDark: "/logo.png",
          defaultLanguage: "en",
          dark: true,
        },
      },
      loginSettings: {
        relogin: true,
        redirectUrl: `http://${window.location.host}/dashboard`,
      },
      chainConfig: getWeb3AuthChainConfig(currentWeb3AuthChain),
    });
    web3auth.configureAdapter(openloginAdapter);
    await web3auth.initModal(initParams);
  } catch (error) {
    console.error(error, "INSIDE WEB3AUTH");
  }
};

export const checkWeb3AuthConnection = () => {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
    console.log("Yeah!, you are successfully logged in", data);
    return true;
  });
};

export const web3authLogout = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
};

export const getWeb3AuthChainConfig = (chainName) => {
  let chainData = availableNetworks[chainName];
  if (chainData) {
    let chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: chainData.chainId,
      rpcTarget: chainData.rpcUrls,
      displayName: chainData.chainName,
      blockExplorer: chainData.blockExplorerUrls,
      ticker: chainData?.nativeCurrency?.symbol,
      tickerName: chainData?.nativeCurrency?.name,
    };
    return chainConfig;
  } else {
    console.log("Invalid Chain Name");
    return;
  }
};

export const changeWeb3AuthChain = (chainName) => {
  currentWeb3AuthChain = chainName;
  initWeb3Auth();
};

export const getWeb3AuthProvider = async () => {
  if (web3authProvider) {
  } else {
    web3authProvider = await web3auth.connect();
  }
  return web3authProvider;
};