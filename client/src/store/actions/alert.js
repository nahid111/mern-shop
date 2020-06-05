import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

const removeAlert = (alertId) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: alertId });
};

const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch(removeAlert(id)), timeout);
};

export { removeAlert, setAlert };
