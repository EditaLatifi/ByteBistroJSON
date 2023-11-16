import {
  GET_RESTAURANT,
  GET_RESTAURANTS,
  DELETE_RESTAURANT,
} from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: {},
};

export default function RestaurantReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };

    case GET_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
      };

    case DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
