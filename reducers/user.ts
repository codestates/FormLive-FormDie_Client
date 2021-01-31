import produce from "immer";

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  logOutErrorReason: "", // 로그아웃 실패 사유
  isLoggingIn: false, // 로그인 시도중
  isLoggedIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  isSignedUp: null, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
  me: null, // 내 정보
  getUserErrorReason: "",
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보
  isEditing: false, // 이름 변경 중
  isEdited: false,
  editErrorReason: "", // 이름 변경 실패 사유
  isChangingImage: false,
  isChangedImage: false,
  isDeleting: false,
  isDeleted: false,
  deleteErrorReason: "",
  changeImageErrorReason: "", // 이름 변경 실패 사유
  hasMoreFollower: false,
  hasMoreFollowing: false,
};
export type IUserReducerState = typeof initialState;

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; 
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"; 
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"; 

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILURE = "EDIT_PROFILE_FAILURE";

export const CHANGE_IMAGE_REQUEST = "CHANGE_IMAGE_REQUEST";
export const CHANGE_IMAGE_SUCCESS = "CHANGE_IMAGE_SUCCESS";
export const CHANGE_IMAGE_FAILURE = "CHANGE_IMAGE_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_REQUEST: {
        draft.isSignedUp = null;
        draft.isSigningUp = true;
        draft.signUpErrorReason = "";
        break;
      }
      case REGISTER_SUCCESS: {
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        break;
      }
      case REGISTER_FAILURE: {
        draft.isSignedUp = false;
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.error;
        break;
      }
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.logInErrorReason = "";
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.isLoggedIn = true;
        draft.logInErrorReason = "";
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.isLoggedIn = false;
        draft.logInErrorReason = action.reason;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.isLoggedIn = false;
        draft.isSignedUp = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        draft.logOutErrorReason = action.reason;
        break;
      }
      case GET_USER_REQUEST: {
        break;
      }
      case GET_USER_SUCCESS: {
        draft.me = action.data;
        draft.isLoggedIn = true;
        draft.getUserErrorReason = "";
        break;
      }
      case GET_USER_FAILURE: {
        draft.me = null;
        draft.isLoggedIn = false;
        draft.getUserErrorReason = action.reason;
        break;
      }
      case EDIT_PROFILE_REQUEST: {
        draft.isEditing = true;
        break;
      }
      case EDIT_PROFILE_SUCCESS: {
        draft.isEditing = false;
        draft.editErrorReason = "";
        draft.me = action.newUser.data;
        break;
      }
      case EDIT_PROFILE_FAILURE: {
        draft.editErrorReason = action.reason;
        break;
      }
      case CHANGE_IMAGE_REQUEST: {
        draft.isChangingImage = true;
        break;
      }
      case CHANGE_IMAGE_SUCCESS: {
        draft.me.profileIconURL = action.data;
        draft.isChangingImage = false;
        draft.isChangedImage = true;
        draft.changeImageErrorReason = "";
        break;
      }
      case CHANGE_IMAGE_FAILURE: {
        draft.isChangingImage = false;
        draft.changeImageErrorReason = action.reason;
        break;
      }
      case DELETE_USER_REQUEST: {
        draft.isDeleting = true;
        break;
      }
      case DELETE_USER_SUCCESS: {
        draft.isDeleting = false;
        draft.isDeleted = true;
        draft.isLoggedIn = false;
        draft.deleteErrorReason = "";
        draft.isSignedUp = null;
        break;
      }
      case DELETE_USER_FAILURE: {
        draft.isDeleting = false;
        draft.isDeleted = false;
        draft.deleteErrorReason = action.reason;
        break;
      }
      default: {
        break;
      }
    }
  });

export default userReducer;
