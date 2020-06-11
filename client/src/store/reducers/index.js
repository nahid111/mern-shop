import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import shop from "./shop";
import cart from "./cart";

export default combineReducers({
  alert,
  auth,
  shop,
  cart
});




