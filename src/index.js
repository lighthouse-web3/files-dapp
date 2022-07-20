import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import { MoralisProvider } from "react-moralis";
import NavigationSetter from "./utils/services/GlobalNavigation/NavigationSetter";
import { SkeletonTheme } from "react-loading-skeleton";

let appIdmoralis = process.env.REACT_APP_APP_ID;
let serverUrlmoralis = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(
  <MoralisProvider appId={appIdmoralis} serverUrl={serverUrlmoralis}>
    <BrowserRouter>
      <NavigationSetter />
      <Provider store={store}>
        <SkeletonTheme baseColor="#b8b8b8d1" highlightColor="#00000021">
          <App />
        </SkeletonTheme>
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  </MoralisProvider>,
  document.getElementById("root")
);
