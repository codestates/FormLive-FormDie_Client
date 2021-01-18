import { combineReducers } from "redux";
import user, { IUserReducerState } from "./user";

export interface IReducerState {
  user: IUserReducerState;
}

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
