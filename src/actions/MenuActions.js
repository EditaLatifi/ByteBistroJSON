import axios from "axios";
import {
  GET_MENUS,
  GET_MENU,
  DELETE_MENU,
  GET_ERRORS,
  CREATE_MENU,
} from "./types";

export const getMenus = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8095/api/menus/list/${id} `);
    dispatch({
      type: GET_MENUS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const createMenu = (id, menu) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8095/api/menus/${id}`, menu);
    window.location.href = `/menuList/${id}`;
    dispatch({
      type: CREATE_MENU,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getMenu = (id, menu_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8095/api/menus/${id}/${menu_id}`
    );
    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (error) {
    window.location.href = "/menus";
  }
};

export const deleteMenu = (id) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this menu?")) {
    try {
      await axios.delete(`http://localhost:8095/api/menus/delete/${id}`);
      dispatch({
        type: DELETE_MENU,
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
