import produce from "immer";

export const initialState = {
  isGettingFormList: false,
  formList: [], // 팔로잉 리스트
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
};

export type IFormReducerState = typeof initialState;

export const FORM_LIST_REQUEST = "FORM_LIST_REQUEST"; // 액션의 이름
export const FORM_LIST_SUCCESS = "FORM_LIST_SUCCESS"; // 액션의 이름
export const FORM_LIST_FAILURE = "FORM_LIST_FAILURE"; // 액션의 이름

export const FORM_GROUP_REQUEST = "FORM_GROUP_REQUEST"; // 액션의 이름
export const FORM_GROUP_SUCCESS = "FORM_GROUP_SUCCESS"; // 액션의 이름
export const FORM_GROUP_FAILURE = "FORM_GROUP_FAILURE"; // 액션의 이름

export const WRITE_GROUP_REQUEST = "WRITE_GROUP_REQUEST"; // 액션의 이름
export const WRITE_GROUP_SUCCESS = "WRITE_GROUP_SUCCESS"; // 액션의 이름
export const WRITE_GROUP_FAILURE = "WRITE_GROUP_FAILURE"; // 액션의 이름

export const GET_FORM_REQUEST = "GET_FORM_REQUEST"; // 액션의 이름
export const GET_FORM_SUCCESS = "GET_FORM_SUCCESS"; // 액션의 이름
export const GET_FORM_FAILURE = "GET_FORM_FAILURE"; // 액션의 이름

export const SEND_FORM_REQUEST = "SEND_FORM_REQUEST"; // 액션의 이름
export const SEND_FORM_SUCCESS = "SEND_FORM_SUCCESS"; // 액션의 이름
export const SEND_FORM_FAILURE = "SEND_FORM_FAILURE"; // 액션의 이름

export const RESEND_FORM_REQUEST = "RESEND_FORM_REQUEST"; // 액션의 이름
export const RESEND_FORM_SUCCESS = "RESEND_FORM_SUCCESS"; // 액션의 이름
export const RESEND_FORM_FAILURE = "RESEND_FORM_FAILURE"; // 액션의 이름

export const NEW_GROUP_REQUEST = "NEW_GROUP_REQUEST"; // 액션의 이름
export const NEW_GROUP_SUCCESS = "NEW_GROUP_SUCCESS"; // 액션의 이름
export const NEW_GROUP_FAILURE = "NEW_GROUP_FAILURE"; // 액션의 이름

export const START_GROUP_REQUEST = "START_GROUP_REQUEST"; // 액션의 이름
export const START_GROUP_SUCCESS = "START_GROUP_SUCCESS"; // 액션의 이름
export const START_GROUP_FAILURE = "START_GROUP_FAILURE"; // 액션의 이름

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
      default: {
        break;
      }
    }
  });

export default formReducer;

