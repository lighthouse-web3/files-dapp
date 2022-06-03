import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import authReducer from "./authReducer";
import nftReducer from "./nftReducers";
import otherDataReducer from "./otherDataReducer";
import balanceReducer from "./balanceReducer";

const reducers = combineReducers({
  file: fileReducer,
  auth: authReducer,
  nft: nftReducer,
  otherData: otherDataReducer,
  balance: balanceReducer,
});

export default reducers;
