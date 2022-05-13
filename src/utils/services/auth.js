import History from "./GlobalNavigation/navigationHistory";
import { web3auth } from "./web3auth";

export function login(address, signedMessage) {
  let expirationDate = new Date();
  expirationDate = expirationDate.setDate(expirationDate.getDate() + 7);
  localStorage.setItem(
    "authData",
    JSON.stringify({
      userAddress: address,
      expirationDate: expirationDate,
      signedMessage: signedMessage,
    })
  );
  History.navigate("/dashboard");
}

export function isLogin() {
  let authData = JSON.parse(localStorage.getItem("authData") || "{}");
  if (
    authData?.["userAddress"] &&
    authData?.["expirationDate"] &&
    authData?.["signedMessage"]
  ) {
    let currentDate = new Date();
    let expirationDate = new Date(authData?.["expirationDate"]);
    return expirationDate.getTime() > currentDate.getTime() ? true : false;
  } else {
    return false;
  }
}

export async function logout() {
  let walletConnected = JSON.parse(
    localStorage.getItem("openlogin_store") || "{}"
  );
  walletConnected?.verifierId && (await web3auth.logout());

  // await web3auth.logout();
  localStorage.clear();
  History.push("/", { state: { from: "logout" } });
}

export function getAddress() {
  let address = null;
  if (isLogin()) {
    address = JSON.parse(localStorage.getItem("authData"))["userAddress"];
  }
  return address;
}
export function getSignMessage() {
  let message = null;
  if (isLogin()) {
    message = JSON.parse(localStorage.getItem("authData"))["signedMessage"];
  }
  return message;
}

