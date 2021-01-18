import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from "../reducers/user";

export default function* userSaga() {
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

  yield all([fork(watchLogIn)]);
}
