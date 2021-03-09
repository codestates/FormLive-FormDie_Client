import {
	SUGGESTION_UPLOAD_REQUEST,
	SUGGESTION_UPLOAD_SUCCESS,
	SUGGESTION_UPLOAD_FAILURE,
} from "../reducers/suggestion";
import { all, call, fork, takeLatest } from "redux-saga/effects";
import axios from "axios";
// 리덕스 사가를 사용하여 서버와 데이터 통신하도록 구성하였습니다.
// 리덕스 사가를 사용하기 위해서는 제너레이터 문법을 사용하였습니다.
// 제너레이터 함수를 만들 때는 function* 로 시작합니다. 일반 함수와는 다르게 yield를 사용하여 여러 번 반환할 수 있습니다.
// takeLatest는 같은 종류의 액션이 여러 번 요청된다면 가장 마지막 액션에 대해서만 동작을 실행합니다.
// call은 함수를 실행시켜주는 것으로 동기 실행을 해줍니다.
// fork는 call과는 반대로 비동기로 함수를 실행합니다.
// put은 dispatch와 동일합니다.

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
