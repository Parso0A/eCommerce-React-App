import { combineReducers } from "redux";
import authReducer from "./auth";
import entitiesReducer from "./entities";
import cartReducer from "./cart";

export default combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  cart: cartReducer,
});
