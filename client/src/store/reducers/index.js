import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import shop from "./shop";

export default combineReducers({
  alert,
  auth,
  shop
});




