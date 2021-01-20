import { IRegister } from "./../components/Register";
import {
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from "./../reducers/user";
import {
  all,
  call,
  fork,
  put,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from "../reducers/user";

export default function* userSaga() {
  function registerAPI(registerData) {
    // 서버에 요청을 보내는 부분
    return axios.post("/user", registerData);
  }

  function* register(action) {
    try {
      const result = yield call(registerAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: REGISTER_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: REGISTER_FAILURE,
        reason: e,
      });
    }
  }

  function* watchRegister() {
    yield takeEvery(REGISTER_REQUEST, register);
  }

  function logInAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get("/api");
  }

  function* logIn() {
    try {
      const result = yield call(logInAPI);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: LOG_IN_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: LOG_IN_FAILURE,
        reason: e,
      });
    }
  }

  function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
  }

  yield all([fork(watchLogIn), fork(watchRegister)]);
}
