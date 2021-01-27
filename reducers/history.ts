import produce from "immer";

export const initialState = {
	historyList: [],
	historyTotal: 0,
	gethistoryListErrorReason: "",
};
export const HISTORY_LIST_REQUEST = "HISTORY_LIST_REQUEST";
export const HISTORY_LIST_SUCCESS = "HISTORY_LIST_SUCCESS";
export const HISTORY_LIST_FAILURE = "HISTORY_LIST_FAILURE";
export const HISTORY_DELETE_REQUEST = "HISTORY_DELETE_REQUEST";
export const HISTORY_DELETE_SUCCESS = "HISTORY_DELETE_SUCCESS";
export const HISTORY_DELETE_FAILURE = "HISTORY_DELETE_FAILURE";

export type IHistoryReducerState = typeof initialState;

const historyReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case HISTORY_LIST_REQUEST: {
				break;
			}
			case HISTORY_LIST_SUCCESS: {
				if (action.page > 1) {
					// page=2 부터 합치기
					draft.historyList = [...draft.historyList, ...action.data.content];
					draft.historyTotal = action.data.total;
				} else if (action.page < 2) {
					draft.historyList = action.data.content;
					draft.historyTotal = action.data.total;
				}
			}
			case HISTORY_LIST_FAILURE: {
				draft.gethistoryListErrorReason = action.reaseon;
			}
		}
	});
export default historyReducer;
