import axios from "axios";
import {
  GET_ERRORS,
  GET_RESTAURANTS,
  GET_RESTAURANT,
  DELETE_RESTAURANT,
  CREATE_RESTAURANT,
} from "./types";

export const createRestaurant = (restaurant) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8095/api/restaurants", restaurant);
    window.location.href = `/restaurants`;
    dispatch({
      type: CREATE_RESTAURANT,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getRestaurants = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8095/api/restaurants/all");
  dispatch({
    type: GET_RESTAURANTS,
    payload: res.data,
  });
};

export const getRestaurant = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8095/api/restaurants/id/${id}`
    );
    dispatch({
      type: GET_RESTAURANT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
    window.location.href = `/`;
    console.log(error.response.data);
  }
};

export const deleteRestaurant = (id) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this restaurant?")) {
    try {
      await axios.delete(`http://localhost:8095/api/restaurants/delete/${id}`);
      dispatch({
        type: DELETE_RESTAURANT,
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
