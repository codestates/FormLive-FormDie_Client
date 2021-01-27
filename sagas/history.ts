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
			console.log(result);
			console.log(action.data.page);
			yield put({
				type: HISTORY_LIST_SUCCESS,
				data: result.data.data,
				page: action.data.page,
			});
		} catch (e) {
			console.log(e);
			yield put({
				type: HISTORY_LIST_FAILURE,
				reason: e,
			});
		}
	}
	function* watchHistoryList() {
		yield takeLatest(HISTORY_LIST_REQUEST, historyList);
	}
	yield all([fork(watchHistoryList)]);
}
