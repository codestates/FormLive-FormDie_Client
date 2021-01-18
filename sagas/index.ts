import { all, fork } from "redux-saga/effects";
import axios from "axios";
import user from "./user";

axios.defaults.baseURL = `https://yangsikdang.ml:8443/`;

export default function* rootSaga() {
  yield all([fork(user)]);
}
