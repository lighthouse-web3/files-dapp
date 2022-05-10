import { ADAPTER_EVENTS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const ethChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: `0x${Number(1).toString(16)}`,
  rpcTarget: `https://mainnet.infura.io/v3/3d635004c08743daae3a5cb579559dbd`,
  displayName: "mainnet",
  blockExplorer:
    "wss://mainnet.infura.io/ws/v3/3d635004c08743daae3a5cb579559dbd",
  ticker: "ETH",
  tickerName: "Ethereum",
};

let clientId = process.env.REACT_APP_WEB3AUTH_APP_ID;
export var web3auth = undefined;

export const initWeb3Auth = async () => {
  try {
    const initParams = {};

    const web3AuthCtorParams = {
      clientId,
      chainConfig: ethChainConfig,
      uiConfig: {
        theme: "dark",
        loginMethodsOrder: ["facebook", "google", "github", "discord"],
        appLogo: "/logo.png",
      },
    };

    web3auth = new Web3Auth(web3AuthCtorParams);
    console.log(window.location.host, "HOST");

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
        redirectUrl: `https://${window.location.host}/dashboard`,
      },
      chainConfig: ethChainConfig,
    });

    web3auth.configureAdapter(openloginAdapter);
    await web3auth.initModal(initParams);
  } catch (error) {
    console.error(error, "INSIDE WEB3AUTH");
  }
};

export const subscribeAuthEvents = (setStatus) => {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
    console.log("Yeah!, you are successfully logged in", data);
    setStatus && setStatus(data);
  });

  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log("connecting");
  });

  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log("disconnected");
  });

  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.error("some error or user has cancelled login request", error);
  });
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
