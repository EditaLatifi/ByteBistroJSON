import {
  GET_MENU_ITEMS,
  GET_MENUS,
  DELETE_MENU_ITEM,
  GET_MENU_ITEM,
} from "../actions/types";

const initialState = {
  tasks: [],
  task: {},
};

export default function MenuItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_ITEMS:
      return {
        ...state,
        tasks: action.payload,
      };
    case GET_MENU_ITEM:
      return {
        ...state,
        task: action.payload,
      };
    case DELETE_MENU_ITEM:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
}
