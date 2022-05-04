import { ADAPTER_EVENTS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { getWeb3auth } from "./auth";

let clientId = process.env.REACT_APP_WEB3AUTH_APP_ID;
export var web3auth = undefined;

export const initWeb3Auth = async () => {
  try {
    const initParams = {};

    const web3AuthCtorParams = {
      clientId,
      chainConfig: { chainNamespace: "eip155", chainId: "0x1" },
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
        uxMode: "redirect",
        whitelabel: {
          name: "Lighthouse",
          logoLight: "/logo.png",
          logoDark: "/logo.png",
          defaultLanguage: "en",
          dark: true,
        },
      },
    });

    web3auth.configureAdapter(openloginAdapter);
    await web3auth.initModal(initParams);
  } catch (error) {
    console.error(error);
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

export const web3authLogout = async () => {
  let web3auth = getWeb3auth();
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
};
