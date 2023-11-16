//to combine our reducers
import { combineReducers } from "redux";
import RestaurantReducer from "./restaurantReducers";
import ErrorReducer from "./ErrorReducer";
import MenuReducer from "./menuReducer";
import MenuItemReducer from "./menuItemReducer";
const roorReducer = combineReducers({
  errorsReducerContent: ErrorReducer,
  restaurantReducerContent: RestaurantReducer,
  menuReducerContent: MenuReducer,
  menuItemReducerContent: MenuItemReducer,
});
export default roorReducer;
