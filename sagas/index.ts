import { all, fork } from "redux-saga/effects";
import axios from "axios";
import user from "./user";
import form from "./form";
import suggestion from "./suggestion";
axios.defaults.baseURL = `http://localhost:5000`;
// https://yangsikdang.ml:5000
// http://localhost:5000
export default function* rootSaga() {
	yield all([fork(user), fork(form), fork(suggestion)]);
}
