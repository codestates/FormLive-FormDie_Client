import {
	SUGGESTION_UPLOAD_REQUEST,
	SUGGESTION_UPLOAD_SUCCESS,
	SUGGESTION_UPLOAD_FAILURE,
} from "../reducers/suggestion";
import { all, call, fork, takeLatest } from "redux-saga/effects";
import axios from "axios";

export default function* suggestionSaga() {
	function suggestionAPI(data) {
		return axios
			.post("/suggestion", data, {
				withCredentials: true,
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((result) => alert("파일 제출 완료되었습니다."));
	}
	function* suggestionFileRequest(action) {
		try {
			yield call(suggestionAPI, action.data);
		} catch (e) {
		}
	}
	function* watchSuggestionFile() {
		yield takeLatest(SUGGESTION_UPLOAD_REQUEST, suggestionFileRequest);
	}
	yield all([fork(watchSuggestionFile)]);
}
