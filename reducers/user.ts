import produce from "immer";

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  isLoggedIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
  me: null, // 내 정보
  getUserErrorReason: "",
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보
  isEditingNickname: false, // 이름 변경 중
  editNicknameErrorReason: "", // 이름 변경 실패 사유
  hasMoreFollower: false,
  hasMoreFollowing: false,
};
export type IUserReducerState = typeof initialState;

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; // 액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"; // 액션의 이름
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"; // 액션의 이름

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_REQUEST: {
        draft.isSignedUp = false;
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
        draft.logInErrorReason = action.reason;
        break;
      }
      case GET_USER_REQUEST: {
        break;
      }
      case GET_USER_SUCCESS: {
        draft.me = action.data;
        draft.getUserErrorReason = "";
        break;
      }
      case GET_USER_FAILURE: {
        draft.me = null;
        draft.getUserErrorReason = action.reason;
        break;
      }
      default: {
        break;
      }
    }
  });

export default userReducer;
