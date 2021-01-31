import produce from "immer";

export const initialState = {
  isGettingFormList: false,
  formList: [],
  formTotalNumber: 0,
  getFormListErrorReason: "",
  isGettingFormGroup: false,
  formGroup: [],
  formGroupTotalNumber: 0,
  getFormGroupErrorReason: "",
  currentGroup: null,
  sentFormData: false,
  sentFormDataErrorReason: "",
  getCurrentFormData: false,
  currentForm: null,
  getCurrentFormErrorReason: "",
  resentFormData: false,
  resentFormDataErrorReason: "",
  makeNewFormGroup: false,
  makeNewFormGroupErrorReason: "",
  startNewFormGroup: false,
  historyList: [],
	historyTotal: 0,
  gethistoryListErrorReason: "",
  getCurrentHistoryErrorReason: "",
  getCurrentHistory: false,
  historyDeleteErrorReason: "",
};

export type IFormReducerState = typeof initialState;

export const FORM_LIST_REQUEST = "FORM_LIST_REQUEST"; 
export const FORM_LIST_SUCCESS = "FORM_LIST_SUCCESS"; 
export const FORM_LIST_FAILURE = "FORM_LIST_FAILURE"; 

export const FORM_GROUP_REQUEST = "FORM_GROUP_REQUEST"; 
export const FORM_GROUP_SUCCESS = "FORM_GROUP_SUCCESS"; 
export const FORM_GROUP_FAILURE = "FORM_GROUP_FAILURE"; 

export const WRITE_GROUP_REQUEST = "WRITE_GROUP_REQUEST"; 
export const WRITE_GROUP_SUCCESS = "WRITE_GROUP_SUCCESS"; 
export const WRITE_GROUP_FAILURE = "WRITE_GROUP_FAILURE"; 

export const GET_FORM_REQUEST = "GET_FORM_REQUEST"; 
export const GET_FORM_SUCCESS = "GET_FORM_SUCCESS"; 
export const GET_FORM_FAILURE = "GET_FORM_FAILURE"; 

export const SEND_FORM_REQUEST = "SEND_FORM_REQUEST"; 
export const SEND_FORM_SUCCESS = "SEND_FORM_SUCCESS"; 
export const SEND_FORM_FAILURE = "SEND_FORM_FAILURE"; 

export const RESEND_FORM_REQUEST = "RESEND_FORM_REQUEST"; 
export const RESEND_FORM_SUCCESS = "RESEND_FORM_SUCCESS"; 
export const RESEND_FORM_FAILURE = "RESEND_FORM_FAILURE"; 

export const NEW_GROUP_REQUEST = "NEW_GROUP_REQUEST"; 
export const NEW_GROUP_SUCCESS = "NEW_GROUP_SUCCESS"; 
export const NEW_GROUP_FAILURE = "NEW_GROUP_FAILURE"; 

export const START_GROUP_REQUEST = "START_GROUP_REQUEST"; 
export const START_GROUP_SUCCESS = "START_GROUP_SUCCESS"; 
export const START_GROUP_FAILURE = "START_GROUP_FAILURE"; 

export const EDIT_GROUP_REQUEST = "EDIT_GROUP_REQUEST"; 
export const EDIT_GROUP_SUCCESS = "EDIT_GROUP_SUCCESS"; 
export const EDIT_GROUP_FAILURE = "EDIT_GROUP_FAILURE"; 

export const HISTORY_LIST_REQUEST = "HISTORY_LIST_REQUEST";
export const HISTORY_LIST_SUCCESS = "HISTORY_LIST_SUCCESS";
export const HISTORY_LIST_FAILURE = "HISTORY_LIST_FAILURE";

export const CURRENT_HISTORY_REQUEST = "CURRENT_HISTORY_REQUEST";
export const CURRENT_HISTORY_SUCCESS = "CURRENT_HISTORY_SUCCESS";
export const CURRENT_HISTORY_FAILURE = "CURRENT_HISTORY_FAILURE";

export const HISTORY_DELETE_REQUEST = "HISTORY_DELETE_REQUEST";
export const HISTORY_DELETE_SUCCESS = "HISTORY_DELETE_SUCCESS";
export const HISTORY_DELETE_FAILURE = "HISTORY_DELETE_FAILURE";

const formReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FORM_LIST_REQUEST: {
        draft.isGettingFormList = true;
        break;
      }
      case FORM_LIST_SUCCESS: {
        draft.isGettingFormList = false;
        draft.formList = action.data.data.content;
        draft.formTotalNumber = action.data.data.total;
        break;
      }
      case FORM_LIST_FAILURE: {
        draft.getFormListErrorReason = action.reason;
        break;
      }
      case FORM_GROUP_REQUEST: {
        draft.isGettingFormGroup = true;
        break;
      }
      case FORM_GROUP_SUCCESS: {
        draft.isGettingFormGroup = false;
        draft.formGroup = action.data.data.content;
        draft.formGroupTotalNumber = action.data.data.total;
        break;
      }
      case FORM_GROUP_FAILURE: {
        draft.getFormGroupErrorReason = action.reason;
        break;
      }
      case WRITE_GROUP_REQUEST: {
        break;
      }
      case WRITE_GROUP_SUCCESS: {
        draft.currentGroup = draft.formGroup.find(
          (group) => group.groupId === Number(action.data)
        );
        break;
      }
      case WRITE_GROUP_FAILURE: {
        break;
      }
      case SEND_FORM_REQUEST: {
        draft.sentFormData = true;
        break;
      }
      case SEND_FORM_SUCCESS: {
        draft.sentFormData = false;
        break;
      }
      case SEND_FORM_FAILURE: {
        draft.sentFormData = false;
        draft.sentFormDataErrorReason = action.reason;
        break;
      }
      case GET_FORM_REQUEST: {
        draft.getCurrentFormData = false;
        break;
      }
      case GET_FORM_SUCCESS: {
        draft.getCurrentFormData = true;
        draft.currentForm = action.data.data;
        draft.currentGroup.forms.forEach((form, index) => {
          if (form?.id === action.data.data.formId) {
            draft.currentGroup.forms[index].contents =
              action.data.data.contents;
            draft.currentGroup.forms[index].isComplete =
              action.data.data.isComplete;
          }
        });
        break;
      }
      case GET_FORM_FAILURE: {
        draft.getCurrentFormErrorReason = action.reason;
        break;
      }
      case RESEND_FORM_REQUEST: {
        draft.resentFormData = true;
        break;
      }
      case RESEND_FORM_SUCCESS: {
        draft.resentFormData = false;
        break;
      }
      case RESEND_FORM_FAILURE: {
        draft.resentFormData = false;
        draft.resentFormDataErrorReason = action.reason;
        break;
      }
      case NEW_GROUP_REQUEST: {
        draft.makeNewFormGroup = false;
        break;
      }
      case NEW_GROUP_SUCCESS: {
        draft.makeNewFormGroup = true;
        draft.currentGroup = action.data.data;
        break;
      }
      case NEW_GROUP_FAILURE: {
        draft.makeNewFormGroup = false;
        draft.makeNewFormGroupErrorReason = action.reason;
        break;
      }
      case EDIT_GROUP_REQUEST: {
        break;
      }
      case EDIT_GROUP_SUCCESS: {
        break;
      }
      case EDIT_GROUP_FAILURE: {
        break;
      }
      case HISTORY_LIST_REQUEST: {
				break;
			}
			case HISTORY_LIST_SUCCESS: {
				if (action.page > 1) {
					draft.historyList = [...draft.historyList, ...action.data.content];
					draft.historyTotal = action.data.total;
				} else if (action.page < 2) {
					draft.historyList = action.data.content;
					draft.historyTotal = action.data.total;
        }
        break;
			}
			case HISTORY_LIST_FAILURE: {
        draft.gethistoryListErrorReason = action.reaseon;
        break;
      }
      case CURRENT_HISTORY_REQUEST: {
        draft.getCurrentHistory = false;
				break;
			}
			case CURRENT_HISTORY_SUCCESS: {
        draft.currentGroup = draft.historyList.find(
          (history) => history.groupId === Number(action.data)
        );
        draft.getCurrentHistory = true;
        break;
			}
			case CURRENT_HISTORY_FAILURE: {
        draft.getCurrentHistory = false;
        draft.getCurrentHistoryErrorReason = action.reaseon;
        break;
      }
      case HISTORY_DELETE_REQUEST: {
				break;
			}
			case HISTORY_DELETE_SUCCESS: {
        const index = draft.historyList.find(
          (history) => history.groupId === Number(action.id)
        );
        draft.historyList.splice(index, 1)
        break;
			}
			case HISTORY_DELETE_FAILURE: {
        draft.historyDeleteErrorReason = action.reaseon;
        break;
			}
      default: {
        break;
      }
    }
  });

export default formReducer;

