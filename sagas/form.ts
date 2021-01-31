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
  HISTORY_LIST_REQUEST,
  HISTORY_LIST_FAILURE,
  HISTORY_LIST_SUCCESS,
  CURRENT_HISTORY_REQUEST,
  CURRENT_HISTORY_FAILURE,
  CURRENT_HISTORY_SUCCESS,
  HISTORY_DELETE_REQUEST,
  HISTORY_DELETE_SUCCESS,
  HISTORY_DELETE_FAILURE,
  EDIT_GROUP_REQUEST,
  EDIT_GROUP_FAILURE,
  EDIT_GROUP_SUCCESS,
} from "./../reducers/form";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

export default function* formSaga() {
  function formListAPI(formQuery) {
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

      yield put({
        type: FORM_LIST_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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

      yield put({
        type: FORM_GROUP_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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
    return axios.get(`/group/${encodeURIComponent(groupId)}`, {
      withCredentials: true,
    });
  }

  function* writeGroup(action) {
    try {
      const result = yield call(writeGroupAPI, action.data);

      yield put({
        type: WRITE_GROUP_SUCCESS,
        data: action.data,
      });
    } catch (e) {
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
    return axios.post("/form", formData, {
      withCredentials: true,
    });
  }

  function* sendForm(action) {
    try {
      const result = yield call(sendFormAPI, action.data);

      yield put({
        type: SEND_FORM_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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
    return axios.get(`/form/${encodeURIComponent(formId)}`, {
      withCredentials: true,
    });
  }

  function* getForm(action) {
    try {
      const result = yield call(getFormAPI, action.data);

      yield put({
        type: GET_FORM_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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
    return axios.patch("/form", formData, {
      withCredentials: true,
    });
  }

  function* resendForm(action) {
    try {
      const result = yield call(resendFormAPI, action.data);

      yield put({
        type: RESEND_FORM_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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
    return axios.post("/group", groupData, { withCredentials: true });
  }

  function* newGroup(action) {
    try {
      const result = yield call(newGroupAPI, action.data);

      yield put({
        type: NEW_GROUP_SUCCESS,
        data: result.data,
      });
    } catch (e) {
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

  function editGroupAPI(groupData) {
    return axios.patch("/group", groupData, { withCredentials: true });
  }

  function* editGroup(action) {
    try {
      const result = yield call(editGroupAPI, action.data);

      yield put({
        type: EDIT_GROUP_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: EDIT_GROUP_FAILURE,
        reason: e,
      });
    }
  }

  function* watchEditGroup() {
    yield takeLatest(EDIT_GROUP_REQUEST, editGroup);
  }

  function historyAPI(historyQuery) {
    return axios.get("/history", {
      params: {
        q: historyQuery.q,
        page: historyQuery.page,
        sort: historyQuery.sort,
      },
      withCredentials: true,
    });
  }

  function* historyList(action) {
    try {
      const result = yield call(historyAPI, action.data);

      yield put({
        type: HISTORY_LIST_SUCCESS,
        data: result.data.data,
        page: action.data.page,
      });
    } catch (e) {
      yield put({
        type: HISTORY_LIST_FAILURE,
        reason: e,
      });
    }
  }

  function* watchHistoryList() {
    yield takeLatest(HISTORY_LIST_REQUEST, historyList);
  }

  function currentHistoryAPI(groupId) {
    return axios.get(`/group/${encodeURIComponent(groupId)}`, {
      withCredentials: true,
    });
  }

  function* currentHistory(action) {
    try {
      const result = yield call(currentHistoryAPI, action.data);

      yield put({
        type: CURRENT_HISTORY_SUCCESS,
        data: action.data,
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: CURRENT_HISTORY_FAILURE,
        reason: e,
      });
    }
  }

  function* watchCurrentHistory() {
    yield takeLatest(CURRENT_HISTORY_REQUEST, currentHistory);
  }

  function historyDeleteAPI(deleteData) {
    return axios.delete("/group", {
      data: {
        groupId: deleteData,
      },
      withCredentials: true,
    });
  }

  function* historyDelete(action) {
    try {
      const result = yield call(historyDeleteAPI, action.data);

      yield put({
        type: HISTORY_DELETE_SUCCESS,
        data: result.data,
        id: action.data,
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: HISTORY_DELETE_FAILURE,
        reason: e,
      });
    }
  }

  function* watchHistoryDelete() {
    yield takeLatest(HISTORY_DELETE_REQUEST, historyDelete);
  }

  yield all([
    fork(watchFormList),
    fork(watchFormGroup),
    fork(watchWriteGroup),
    fork(watchSendForm),
    fork(watchGetForm),
    fork(watchResendForm),
    fork(watchNewGroup),
    fork(watchHistoryList),
    fork(watchCurrentHistory),
    fork(watchHistoryDelete),
    fork(watchEditGroup),
  ]);
}
