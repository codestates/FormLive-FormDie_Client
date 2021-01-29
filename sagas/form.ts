import {
  FORM_LIST_REQUEST,
  FORM_LIST_FAILURE,
  FORM_LIST_SUCCESS,
  FORM_GROUP_REQUEST,
  FORM_GROUP_SUCCESS,
  FORM_GROUP_FAILURE,
  NEW_GROUP_REQUEST,
  NEW_GROUP_SUCCESS,
  NEW_GROUP_FAILURE,
  WRITE_GROUP_REQUEST,
  WRITE_GROUP_SUCCESS,
  WRITE_GROUP_FAILURE,
  SEND_FORM_REQUEST,
  SEND_FORM_FAILURE,
  SEND_FORM_SUCCESS,
  GET_FORM_REQUEST,
  GET_FORM_FAILURE,
  GET_FORM_SUCCESS,
  RESEND_FORM_REQUEST,
  RESEND_FORM_FAILURE,
  RESEND_FORM_SUCCESS,
  START_GROUP_REQUEST,
  START_GROUP_SUCCESS,
  START_GROUP_FAILURE,
} from "./../reducers/form";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

export default function* formSaga() {
  function formListAPI(formQuery) {
    // 서버에 요청을 보내는 부분
    return axios.get("/form", {
      params: {
        q: formQuery.q,
        page: formQuery.page,
        sort: formQuery.sort,
      },
      withCredentials: true,
    });
  }

  function* formList(action) {
    try {
      const result = yield call(formListAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: FORM_LIST_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: FORM_LIST_FAILURE,
        reason: e,
      });
    }
  }

  function* watchFormList() {
    yield takeLatest(FORM_LIST_REQUEST, formList);
  }

  function formGroupAPI(formQuery) {
    // 서버에 요청을 보내는 부분
    return axios.get("/group", {
      params: {
        q: formQuery.q,
        page: formQuery.page,
        sort: formQuery.sort,
      },
      withCredentials: true,
    });
  }

  function* formGroup(action) {
    try {
      const result = yield call(formGroupAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: FORM_GROUP_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: FORM_GROUP_FAILURE,
        reason: e,
      });
    }
  }

  function* watchFormGroup() {
    yield takeLatest(FORM_GROUP_REQUEST, formGroup);
  }

  function writeGroupAPI(groupId) {
    // 서버에 요청을 보내는 부분
    return axios.get(`/group/${encodeURIComponent(groupId)}`, {
      withCredentials: true,
    });
  }

  function* writeGroup(action) {
    try {
      const result = yield call(writeGroupAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: WRITE_GROUP_SUCCESS,
        data: action.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: WRITE_GROUP_FAILURE,
        reason: e,
      });
    }
  }

  function* watchWriteGroup() {
    yield takeLatest(WRITE_GROUP_REQUEST, writeGroup);
  }

  function sendFormAPI(formData) {
    // 서버에 요청을 보내는 부분
    return axios.post("/form", formData, {
      withCredentials: true,
    });
  }

  function* sendForm(action) {
    try {
      const result = yield call(sendFormAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: SEND_FORM_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: SEND_FORM_FAILURE,
        reason: e,
      });
    }
  }

  function* watchSendForm() {
    yield takeLatest(SEND_FORM_REQUEST, sendForm);
  }

  function getFormAPI(formId) {
    // 서버에 요청을 보내는 부분
    return axios.get(`/form/${encodeURIComponent(formId)}`, {
      withCredentials: true,
    });
  }

  function* getForm(action) {
    try {
      const result = yield call(getFormAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: GET_FORM_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: GET_FORM_FAILURE,
        reason: e,
      });
    }
  }

  function* watchGetForm() {
    yield takeLatest(GET_FORM_REQUEST, getForm);
  }

  function resendFormAPI(formData) {
    // 서버에 요청을 보내는 부분
    return axios.patch("/form", formData, {
      withCredentials: true,
    });
  }

  function* resendForm(action) {
    try {
      const result = yield call(resendFormAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: RESEND_FORM_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: RESEND_FORM_FAILURE,
        reason: e,
      });
    }
  }

  function* watchResendForm() {
    yield takeLatest(RESEND_FORM_REQUEST, resendForm);
  }

  function newGroupAPI(groupData) {
    // 서버에 요청을 보내는 부분
    return axios.post("/group", groupData, { withCredentials: true });
  }

  function* newGroup(action) {
    try {
      const result = yield call(newGroupAPI, action.data);
      console.log(result);
      yield put({
        // put은 dispatch 동일
        type: NEW_GROUP_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      // loginAPI 실패
      console.error(e);
      yield put({
        type: NEW_GROUP_FAILURE,
        reason: e,
      });
    }
  }

  function* watchNewGroup() {
    yield takeLatest(NEW_GROUP_REQUEST, newGroup);
  }

  
  yield all([
    fork(watchFormList),
    fork(watchFormGroup),
    fork(watchWriteGroup),
    fork(watchSendForm),
    fork(watchGetForm),
    fork(watchResendForm),
    fork(watchNewGroup),
  ]);
}
