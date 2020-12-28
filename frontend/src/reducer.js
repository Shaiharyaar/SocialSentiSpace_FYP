import { combineReducers } from "redux";
import authReducer from "./Components/Auth/authReducer";

export default combineReducers({
  authState: authReducer,
});
