import { IRegister } from "./../components/Register";
import {
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
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
import {} from "../reducers/user";

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

  function logInAPI(loginData) {
    // 서버에 요청을 보내는 부분
    return axios.post("/user/signin", loginData, { withCredentials: true });
  }

  function* logIn(action) {
    try {
      const result = yield call(logInAPI, action.data);
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
    yield takeEvery(LOG_IN_REQUEST, logIn);
  }

  function getUserAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get("/user", { withCredentials: true });
  }

  function* getUser() {
    try {
      const result = yield call(getUserAPI);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: GET_USER_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: GET_USER_FAILURE,
        reason: e,
      });
    }
  }

  function* watchGetUser() {
    yield takeEvery(GET_USER_REQUEST, getUser);
  }

  yield all([fork(watchRegister), fork(watchLogIn), fork(watchGetUser)]);
}
