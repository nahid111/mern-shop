import axios from 'axios';
import { setAlert } from './alert';
import {
  LOADING_START,
  LOADING_END,
  CATEGORY_LOADED
} from "./types";


//======================================================================
//                          Load Categories
//======================================================================
export const loadCategories = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.get("/api/v1/categories");
    dispatch({ type: CATEGORY_LOADED, payload: res.data.data });
    dispatch({ type: LOADING_END });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger", 60000));
    dispatch({ type: LOADING_END });
  }
};

//======================================================================
//                         Add Category
//======================================================================
export const addCategory = (title) => async (dispatch) => {
  const config = {
    headers: {"Content-Type": "application/json"}
  };

  const body = JSON.stringify({title});

  try {
    dispatch({ type: LOADING_START });
    await axios.post(`/api/v1/categories`, body, config);
    dispatch(loadCategories());
    dispatch({ type: LOADING_END });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger", 60000));
    dispatch({ type: LOADING_END });
  }
};

//======================================================================
//                         Delete Category
//======================================================================
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    await axios.delete(`/api/v1/categories/${id}`);
    dispatch(loadCategories());
    dispatch({ type: LOADING_END });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger", 60000));
    dispatch({ type: LOADING_END });
  }
};