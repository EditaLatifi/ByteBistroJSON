import axios from "axios";
import {
  GET_MENU_ITEMS,
  GET_MENU_ITEM,
  DELETE_MENU_ITEM,
  CREATE_MENU_ITEM,
  UPDATE_MENU_ITEM,
  GET_ERRORS,
} from "./types";

export const getMenuItems = (menu_id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8095/api/menuItems/${menu_id}`);
    dispatch({
      type: GET_MENU_ITEMS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const createMenuItem = (menu_id, menuItem) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8095/api/menuItems/${menu_id}`,
      menuItem
    );
    dispatch({
      type: CREATE_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getMenuItem = (menu_id, id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8095/api/menuItems/${menu_id}/${id}`
    );
    dispatch({
      type: GET_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateMenuItem = (menu_id, id, updatedMenuItem) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:8095/api/menuItems/${menu_id}/${id}`,
      updatedMenuItem
    );
    dispatch({
      type: UPDATE_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const deleteMenuItem = (menu_id, id) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this menu item?")) {
    try {
      await axios.delete(`http://localhost:8095/api/menuItems/${menu_id}/${id}`);
      dispatch({
        type: DELETE_MENU_ITEM,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  }
};
