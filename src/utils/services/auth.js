export function login(address, signed_message, _navigate) {
  let expirationDate = new Date();
  expirationDate = expirationDate.setDate(expirationDate.getDate() + 7);
  localStorage.setItem(
    "authData",
    JSON.stringify({
      userAddress: address,
      expirationDate: expirationDate,
      signedMessage: signed_message,
    })
  );
  _navigate("/dashboard");
}

export function isLogin() {
  let authData = JSON.parse(localStorage.getItem("authData") || "{}");
  if (authData?.["userAddress"] && authData?.["expirationDate"]) {
    let currentDate = new Date();
    let expirationDate = new Date(authData?.["expirationDate"]);
    return expirationDate.getTime() > currentDate.getTime() ? true : false;
  } else {
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

export function logout() {
  localStorage.clear();
}
