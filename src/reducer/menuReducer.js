import { GET_MENUS, GET_MENU, DELETE_MENU } from "../actions/types";

const initialState = {
  menus: [],
  menu: {},
};

export default function MenuReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENUS:
      return {
        ...state,
        menus: action.payload,
      };
    case GET_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    case DELETE_MENU:
      return {
        ...state,
        menus: state.menus.filter((menu) => menu.id !== action.payload),
      };
    default:
      return state;
  }
}
