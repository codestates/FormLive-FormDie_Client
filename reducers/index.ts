import form, { IFormReducerState } from "./form";
import { combineReducers } from "redux";
import user, { IUserReducerState } from "./user";
import history, { IHistoryReducerState } from "./history";

export interface IReducerState {
	user: IUserReducerState;
	form: IFormReducerState;
	history: IHistoryReducerState;
}

const rootReducer = combineReducers({
	user,
	form,
	history,
});

export default rootReducer;
