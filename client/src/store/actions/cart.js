import {
  // LOADING_START,
  // LOADING_END,
  // CART_LOADED,
  VIEW_CART,
  HIDE_CART,
} from "./types";


//======================================================================
//                          View Cart
//======================================================================
export const viewCart = () => async (dispatch) => {
  dispatch({ type: VIEW_CART });
};


//======================================================================
//                          Hide Cart
//======================================================================
export const hideCart = () => async (dispatch) => {
  dispatch({ type: HIDE_CART });
};

