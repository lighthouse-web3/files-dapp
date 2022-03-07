import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider
    appId=process.env.appId
    serverUrl=process.env.serverUrl
  >
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  </MoralisProvider>,
  document.getElementById("root")
);
