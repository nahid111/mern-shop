import {
  CATEGORY_LOADED
} from "../actions/types";


const initialState = {
  categories: [],
  products: []
}


export default (state = initialState, action) => {
    switch (action.type) {
      case CATEGORY_LOADED:
        return {
          ...state,
          categories: action.payload,
        };
      default:
        return state;
    }
}

