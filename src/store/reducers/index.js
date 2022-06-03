import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import authReducer from "./authReducer";
import nftReducer from "./nftReducers";
import otherDataReducer from "./otherDataReducer";
import balanceReducer from "./balanceReducer";
import sideBarReducer from "./sidebarReducer";

const reducers = combineReducers({
  file: fileReducer,
  auth: authReducer,
  nft: nftReducer,
  otherData: otherDataReducer,
  balance: balanceReducer,
  sidebar: sideBarReducer,
});

export default reducers;
