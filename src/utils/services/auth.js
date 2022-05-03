import Logout from "../logout";

export function login(address, _navigate) {
  let expirationDate = new Date();
  expirationDate = expirationDate.setDate(expirationDate.getDate() + 7);
  localStorage.setItem(
    "authData",
    JSON.stringify({
      userAddress: address,
      expirationDate: expirationDate,
      web3auth: "web3auth",
    })
  );
  _navigate("/dashboard");
}

export function isLogin() {
  let authData = JSON.parse(localStorage.getItem("authData") || "{}");
  if (
    authData?.["userAddress"] &&
    authData?.["expirationDate"] &&
    authData?.["web3auth"]
  ) {
    let currentDate = new Date();
    let expirationDate = new Date(authData?.["expirationDate"]);
    return expirationDate.getTime() > currentDate.getTime() ? true : false;
  } else {
    <Logout />;
    return false;
  }
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
export function getWeb3auth() {
  let web3auth = null;
  if (isLogin()) {
    web3auth = JSON.parse(localStorage.getItem("authData"))["web3auth"];
  }
  return web3auth;
}
