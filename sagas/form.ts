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

  // function newGroupAPI(groupData) {
  //   // 서버에 요청을 보내는 부분
  //   return axios.post("/group", groupData, { withCredentials: true });
  // }

  // function* newGroup(action) {
  //   try {
  //     const result = yield call(newGroupAPI, action.data);
  //     console.log(result);
  //     yield put({
  //       // put은 dispatch 동일
  //       type: NEW_GROUP_SUCCESS,
  //       data: result.data,
  //     });
  //   } catch (e) {
  //     // loginAPI 실패
  //     console.error(e);
  //     yield put({
  //       type: NEW_GROUP_FAILURE,
  //       reason: e,
  //     });
  //   }
  // }

  // function* watchNewGroup() {
  //   yield takeLatest(NEW_GROUP_REQUEST, newGroup);
  // }

  yield all([fork(watchFormList), fork(watchFormGroup)]);
}
// , fork(watchNewGroup)
