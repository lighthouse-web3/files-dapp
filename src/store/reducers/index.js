import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import authReducer from "./authReducer";
import nftReducer from "./nftReducers";
import otherDataReducer from "./otherDataReducer";

const reducers = combineReducers({
  file: fileReducer,
  auth: authReducer,
  nft: nftReducer,
  otherData: otherDataReducer,
});

export default reducers;
