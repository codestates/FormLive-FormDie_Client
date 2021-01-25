import {
	HISTORY_LIST_REQUEST,
	HISTORY_LIST_SUCCESS,
	HISTORY_LIST_FAILURE,
} from "../reducers/history";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

export default function* historySaga() {
	function historyAPI(historyQuery) {
		return axios.get("/history", {
			params: {
				page: historyQuery.page,
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
			});
		} catch (e) {
			console.log(e);
		}
	}
	function* watchHistoryList() {
		yield takeLatest(HISTORY_LIST_REQUEST, historyList);
	}
	yield all([fork(watchHistoryList)]);
}
