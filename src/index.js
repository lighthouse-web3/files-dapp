import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import { MoralisProvider } from "react-moralis";

let appIdmoralis = process.env.REACT_APP_APP_ID;
let serverUrlmoralis = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(
  <MoralisProvider appId={appIdmoralis} serverUrl={serverUrlmoralis}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  </MoralisProvider>,
  document.getElementById("root")
);
