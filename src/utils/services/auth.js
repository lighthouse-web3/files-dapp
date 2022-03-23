export function login(address, _navigate) {
  let expirationDate = new Date();
  expirationDate = expirationDate.setDate(expirationDate.getDate() + 7);
  //console.log(expirationDate);
  localStorage.setItem(
    "authData",
    JSON.stringify({
      userAddress: address,
      expirationDate: expirationDate,
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

export function logout() {
  localStorage.clear();
}
