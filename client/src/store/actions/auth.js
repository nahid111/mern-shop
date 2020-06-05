import axios from 'axios';
import { setAlert } from './alert';
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
} from "./types";


//======================================================================
//                          Load user
//======================================================================
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth/me");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};


//======================================================================
//                              Login
//======================================================================
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email: email, password: password });

  try {
    const res = await axios.post("/api/v1/auth/login", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());

  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
    dispatch({ type: LOGIN_FAIL });
  }
};


//======================================================================
//                           Register
//======================================================================
export const register = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  try {
    await axios.post("/api/v1/auth/register", body, config);
    dispatch(
      setAlert(
        `An Email will be sent to your email address containing a link to verify it. 
        This link will expire after the next 24 hours. 
        Please Visit your email and follow the link for the next steps.`,
        "success",
        60000
      )
    );
    dispatch({ type: REGISTER_SUCCESS });
    dispatch(loadUser());

  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
    dispatch({ type: REGISTER_FAIL });
  }
};


//======================================================================
//                         Verify Email
//======================================================================
export const verifyEmail = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  try {
    await axios.get("/api/v1/auth/verifyemail/"+token, config);
    dispatch({ type: VERIFY_EMAIL });

  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
  }
};


//======================================================================
//                      Logout / Clear profile
//======================================================================
export const logout = () => async (dispatch) => {
  await axios.get("/api/v1/auth/logout");
  dispatch({ type: LOGOUT });
};


//======================================================================
//                              updateUser
//======================================================================
export const updateUser = (name, email, avatar) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('avatar', avatar);

  try {
    await axios.put("/api/v1/auth/updatedetails", formData, config);
    dispatch(loadUser());
    dispatch(setAlert("Info Updated", "success"));

  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
    dispatch(setAlert("Update Failed", "danger"));
  }
};


//======================================================================
//                         Forgot Password
//======================================================================
export const forgotPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({email});

  try {
    dispatch({ type: LOADING_START });

    await axios.post("/api/v1/auth/forgotpassword", body, config);

    dispatch(
      setAlert(
        `An Email will be sent to this email address containing a link to reset the password. Please Visit your email and follow the link for the next steps.`,
        "success",
        60000
      )
    );

    dispatch({ type: LOADING_END });

  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
  }
};

//======================================================================
//                         Reset Password
//======================================================================
export const resetPassword = (token, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({password});

  try {
    await axios.put("/api/v1/auth/resetpassword/"+token, body, config);
    dispatch(setAlert("Password Reset Successful. Login to continue", "success", 60000));

  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
  }
};



