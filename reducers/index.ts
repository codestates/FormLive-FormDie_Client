import form, { IFormReducerState } from "./form";
import { combineReducers } from "redux";
import user, { IUserReducerState } from "./user";

export interface IReducerState {
	user: IUserReducerState;
	form: IFormReducerState;
}

const rootReducer = combineReducers({
	user,
	form,
});

export default rootReducer;
