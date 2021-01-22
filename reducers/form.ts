import produce from "immer";

export const initialState = {
  isGettingFormList: false,
  formList: [], // 팔로잉 리스트
  formTotalNumber: 0,
  getFormListErrorReason: "",
};
export type IFormReducerState = typeof initialState;

export const FORM_LIST_REQUEST = "FORM_LIST_REQUEST"; // 액션의 이름
export const FORM_LIST_SUCCESS = "FORM_LIST_SUCCESS"; // 액션의 이름
export const FORM_LIST_FAILURE = "FORM_LIST_FAILURE"; // 액션의 이름

const formReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FORM_LIST_REQUEST: {
        draft.isGettingFormList = true;
        break;
      }
      case FORM_LIST_SUCCESS: {
        draft.isGettingFormList = false;
        draft.formList = action.data;
        draft.formTotalNumber = action.data;
        break;
      }
      case FORM_LIST_FAILURE: {
        draft.getFormListErrorReason = action.reason;
        break;
      }

      default: {
        break;
      }
    }
  });

export default formReducer;
