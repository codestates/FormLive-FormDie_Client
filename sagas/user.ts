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
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

export default function* userSaga() {
  function registerAPI(registerData) {
    return axios.post("/user", registerData);
  }

  function* register(action) {
    try {
      const result = yield call(registerAPI, action.data);

      yield put({
        type: REGISTER_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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
    return axios.post("/user/signin", loginData, { withCredentials: true });
  }

  function* logIn(action) {
    try {
      const result = yield call(logInAPI, action.data);

      yield put({
        type: LOG_IN_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      console.error(e);
      window.alert("이메일 또는 비밀번호가 일치하지 않습니다.");
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
    return axios.post("/user/signout", { withCredentials: true });
  }

  function* logOut() {
    try {
      const result = yield call(logOutAPI);

      yield put({
        type: LOG_OUT_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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
    return axios.get("/user", { withCredentials: true });
  }

  function* getUser() {
    try {
      const result = yield call(getUserAPI);

      yield put({
        type: GET_USER_SUCCESS,
        data: result.data.data,
      });
    } catch (e) {
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
    return axios.patch("/user", editData, { withCredentials: true });
  }

  function* editProfile(action) {
    try {
      const result = yield call(editProfileAPI, action.data);
      const newUser = yield call(getUserAPI);

      yield put({
        type: EDIT_PROFILE_SUCCESS,
        data: result.data,
        newUser: newUser.data,
      });
    } catch (e) {
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
    const data = new FormData();
    data.append("img", imgData);

    return axios.post("/user/icon", data, { withCredentials: true });
  }

  function* changeImage(action) {
    try {
      const result = yield call(changeImageAPI, action.data);

      yield put({
        type: CHANGE_IMAGE_SUCCESS,
        data: result.data.data.profileIconURL,
      });
    } catch (e) {
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
    return axios.delete("/user", { data: deleteData, withCredentials: true });
  }

  function* deleteUser(action) {
    try {
      const result = yield call(deleteUserAPI, action.data);

      yield put({
        type: DELETE_USER_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      console.error(e);
      window.alert("비밀번호가 일치하지 않습니다.");
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
