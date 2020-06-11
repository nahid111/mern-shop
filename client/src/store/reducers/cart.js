import {
    // CART_LOADED,
    VIEW_CART,
    HIDE_CART
  } from "../actions/types";
  
  
  const initialState = {
    viewCart: false,
    items: [],
    total: 0
  }
  
  
  export default (state = initialState, action) => {
      switch (action.type) {
        case VIEW_CART:
          return {
            ...state,
            viewCart: true,
          };
        case HIDE_CART:
          return {
            ...state,
            viewCart: false,
          };
        // case CART_LOADED:
        //   return {
        //     ...state,
        //     items: action.payload,
        //   };
        default:
          return state;
      }
  }
  
  