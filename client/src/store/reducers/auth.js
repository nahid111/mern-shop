import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  VERIFY_EMAIL,
  LOADING_START,
  LOADING_END,
} from "../actions/types";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isVerified: false,
    loading: true,
    user: null
}


export default (state = initialState, action) => {
    switch (action.type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload.data,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isVerified: false,
          loading: false,
        };
      case VERIFY_EMAIL:
        return {
          ...state,
          isVerified: true,
        };
      case LOADING_START:
        return {
          ...state,
          loading: true,
        };
      case LOADING_END:
        return {
          ...state,
          loading: false,
        };
      case LOGOUT:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case REGISTER_FAIL:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      default:
        return state;
    }
}

