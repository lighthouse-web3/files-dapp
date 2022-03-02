import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import authReducer from "./authReducer";
import nftReducer from "./nftReducers";

const reducers = combineReducers({
  file: fileReducer,
  auth: authReducer,
  nft: nftReducer,
});

export default reducers;
