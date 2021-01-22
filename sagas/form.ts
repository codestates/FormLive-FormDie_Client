import {
  FORM_LIST_REQUEST,
  FORM_LIST_FAILURE,
  FORM_LIST_SUCCESS,
} from "./../reducers/form";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

export default function* formSaga() {
  function formListAPI(formQuery) {
    // 서버에 요청을 보내는 부분
    return axios.get("/form", {
      params: {
        page: formQuery.page,
        sort: formQuery.sort,
      },
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

  yield all([fork(watchFormList)]);
}
