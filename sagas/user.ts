import { useDispatch } from "react-redux";
import { IRegister } from "./../components/Register";
import {
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  CHANGE_IMAGE_REQUEST,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
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

  function logOutAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post("/user/signout", { withCredentials: true });
  }

  function* logOut() {
    try {
      const result = yield call(logOutAPI);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: LOG_OUT_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: LOG_OUT_FAILURE,
        reason: e,
      });
    }
  }

  function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
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
        data: result.data.data,
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

  function editProfileAPI(editData) {
    // 서버에 요청을 보내는 부분
    return axios.patch("/user", editData, { withCredentials: true });
  }

  function* editProfile(action) {
    try {
      const result = yield call(editProfileAPI, action.data);
      const newUser = yield call(getUserAPI);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: EDIT_PROFILE_SUCCESS,
        data: result.data,
        newUser: newUser.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: EDIT_PROFILE_FAILURE,
        reason: e,
      });
    }
  }

  function* watchEditProfile() {
    yield takeEvery(EDIT_PROFILE_REQUEST, editProfile);
  }

  function changeImageAPI(imgData) {
    // 서버에 요청을 보내는 부분
    console.log(imgData);
    const data = new FormData();
    data.append("img", imgData);

    return axios.post("/user/icon", data, { withCredentials: true });
  }

  function* changeImage(action) {
    try {
      console.log(action);
      const result = yield call(changeImageAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: CHANGE_IMAGE_SUCCESS,
        data: result.data.data.profileIconURL,
      });
    } catch (e) {
      console.log(action);
      // loginAPI 실패
      console.error(e);
      yield put({
        type: CHANGE_IMAGE_FAILURE,
        reason: e,
      });
    }
  }

  function* watchChangeImage() {
    yield takeEvery(CHANGE_IMAGE_REQUEST, changeImage);
  }

  function deleteUserAPI(deleteData) {
    // 서버에 요청을 보내는 부분
    console.log(deleteData);
    return axios.delete("/user", { data: deleteData, withCredentials: true });
  }

  function* deleteUser(action) {
    try {
      console.log(action);
      const result = yield call(deleteUserAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: DELETE_USER_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: DELETE_USER_FAILURE,
        reason: e,
      });
    }
  }

  function* watchDeleteUser() {
    yield takeEvery(DELETE_USER_REQUEST, deleteUser);
  }

  yield all([
    fork(watchRegister),
    fork(watchLogIn),
    fork(watchGetUser),
    fork(watchLogOut),
    fork(watchEditProfile),
    fork(watchChangeImage),
    fork(watchDeleteUser),
  ]);
}
