import produce from "immer";

export const SUGGESTION_UPLOAD_REQUEST = "SUGGESTION_UPLOAD_REQUEST";
export const SUGGESTION_UPLOAD_SUCCESS = "SUGGESTION_UPLOAD_SUCCESS";
export const SUGGESTION_UPLOAD_FAILURE = "SUGGESTION_UPLOAD_FAILURE";

export const suggestionReducer = (state, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case SUGGESTION_UPLOAD_REQUEST: {
				break;
			}
			case SUGGESTION_UPLOAD_SUCCESS: {
				break;
			}
			case SUGGESTION_UPLOAD_FAILURE: {
				break;
			}
		}
	});
