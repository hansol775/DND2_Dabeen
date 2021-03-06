import proudce, { produce } from "immer";
import { createAction } from './actionFunction';

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  logoutError: "", // 로그아웃 실패 사유
  isLoggingIn: false, // 로그인 시도중
  isLoginSuccess: false, // 로그인 성공 여부
  loginError: "", // 로그인 실패 사유
  isSigningup: false, //회원가입 시도중
  signUpSuccess : false, // 회원가입 성공 여부
  signUpError: "", // 회원 가입 실패
  userInfo: { id: 1, nickname: "ansrjsdn" }, // 내 정보
  isUpdatingInfo: false, // 정보 업데이트중
  updateError: ""
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; // 액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"; // 서버쪽에 갔다 와야 하는 비동기 액션
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

// export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
// export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
// export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const EDIT_USERINFO_REQUEST = "EDIT_USERINFO_REQUEST";
export const EDIT_USERINFO_SUCCESS = "EDIT_USERINFO_SUCCESS";
export const EDIT_USERINFO_FAILURE = "EDIT_USERINFO_FAILURE";

// 회원가입 : data를 가지고 서버에 회원가입 요청을 날린다 -> 성공한다 : 회원가입 끝 OR 실패한다 : 에러 이유
export const signUpRequestAction = createAction(SIGN_UP_REQUEST);
export const signUpSuccessAction = createAction(SIGN_UP_SUCCESS);
export const signUpFailureAction = createAction(SIGN_UP_FAILURE);

// id, password를 가지고 로그인 요청을 서버로 보낸다. -> 성공한다 : 유저 정보 저장  or 실패한다 : 에러 이유
export const loginRequestAction = createAction(LOG_IN_REQUEST);
export const loginSuccessAction = createAction(LOG_IN_SUCCESS);
export const loginFailureAction = createAction(LOG_IN_FAILURE);

// 회원 정보를 바탕으로 서버에 로그아웃 요청을 보낸다 -> 성공한다 : 유저 정보 null로 or 실패한다 : 에러 이유
export const logoutRequestAction = createAction(LOG_OUT_REQUEST);
export const logoutSuccessAction = createAction(LOG_OUT_SUCCESS);
export const logoutFailureAction = createAction(LOG_OUT_FAILURE);

// export const loadUserRequestAction = createAction(LOAD_USER_REQUEST);
// export const loadUserSuccessAction = createAction(LOAD_USER_SUCCESS);
// export const loadUserFailureAction = createAction(LOAD_USER_FAILURE);

// 자신 정보 수정을 보낸다 -> 성공한다 : 유저정보 불러와서 다시 저장 or 실패한다 : 에러
export const editUserInfoRequestAction = ({
  profile,
  nickname,
  introduce,
  password,
  email,
  phoneNumber,
  address
}) => ({
  type: EDIT_USERINFO_REQUEST,
  data: {
    profile,
    nickname,
    introduce,
    password,
    email,
    phoneNumber,
    address
  }
});

export const editUserInfoSuccessAction = data => ({
  type: EDIT_USERINFO_SUCCESS,
  data
});

export const editUserInfoFailureAction = () => ({
  type: EDIT_USERINFO_FAILURE
});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.isLoginSuccess = true;
        draft.userInfo = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.isLoginSuccess = false;
        draft.loginError = action.data.error;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.isLoginSuccess = false;
        draft.userInfo = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        draft.logoutError = action.data.error;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSigningup = true;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningup = false;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningup = false;
        draft.signUpError = action.data.error;
        break;
      }
      case EDIT_USERINFO_REQUEST: {
        draft.isUpdatingInfo = true;
        break;
      }
      case EDIT_USERINFO_SUCCESS: {
        draft.isUpdatingInfo = false;
        draft.userInfo = action.data;
        break;
      }
      case EDIT_USERINFO_FAILURE: {
        draft.isUpdatingInfo = false;
        draft.updateError = action.data.error;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
