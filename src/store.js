//create a store with middleware and Redux devTools Extenesion
//devTool extension that we have on Chrome
// the create sture is imported from redux but i alisaed as   legacy_createStor
// because Dedux has changed the way that createstore is used in newer verions
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
// thunk is a middleware.
// This middleware allows you to write action creators that return functions instead of plain objects,
// so you can perform asynchronous operations before dispatching the final action.
import thunk from "redux-thunk";
import rootReducer from "./reducer";
//the initialState is argument that sets the initial state of the Redux store.
const initialState = {};
// the
const middleware = [thunk];

let store;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
