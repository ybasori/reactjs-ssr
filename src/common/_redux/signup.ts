import { Action, SignupState } from "./types";
import { put, delay, takeLatest } from "redux-saga/effects";

import api from "../_configs/api";

const POST_SIGNUP_REGISTER = "POST_SIGNUP_REGISTER";
const POST_SIGNUP_REGISTER_LOADING = "POST_SIGNUP_REGISTER_LOADING";
const POST_SIGNUP_REGISTER_SUCCESS = "POST_SIGNUP_REGISTER_SUCCESS";
const POST_SIGNUP_REGISTER_ERROR = "POST_SIGNUP_REGISTER_ERROR";
const POST_SIGNUP_REGISTER_RESET = "POST_SIGNUP_REGISTER_RESET";

const initState: SignupState = {
  isLoadingPostSignupRegister: false,
  successPostSignupRegister: null,
  errorPostSignupRegister: null,
};

const signup = (state = initState, action: Action) => {
  switch (action.type) {
    case POST_SIGNUP_REGISTER_LOADING:
      return {
        ...state,
        isLoadingPostSignupRegister: true,
        successPostSignupRegister: null,
        errorPostSignupRegister: null,
      };

    case POST_SIGNUP_REGISTER_SUCCESS:
      return {
        ...state,
        isLoadingPostSignupRegister: false,
        successPostSignupRegister: action.payload?.data,
        errorPostSignupRegister: null,
      };

    case POST_SIGNUP_REGISTER_ERROR:
      return {
        ...state,
        isLoadingPostSignupRegister: false,
        successPostSignupRegister: null,
        errorPostSignupRegister: action.payload,
      };

    case POST_SIGNUP_REGISTER_RESET:
      return {
        ...state,
        isLoadingPostSignupRegister: false,
        successPostSignupRegister: null,
        errorPostSignupRegister: null,
      };
    default:
      return { ...state };
  }
};

export default signup;

function* postSignupRegisterSaga(action: Action) {
  try {
    yield put({ type: POST_SIGNUP_REGISTER_LOADING });
    let formdata = new FormData();
    let data = action.payload?.data;
    Object.keys(data).map((key) => {
      formdata.append(key, data[key]);
      return key;
    });
    const result = yield api().postSignupRegister(formdata);

    yield delay(1000);
    yield put({ type: POST_SIGNUP_REGISTER_SUCCESS, payload: result.data });
  } catch (err) {
    yield put({ type: POST_SIGNUP_REGISTER_ERROR, payload: err });
  }
}

export function* watchSignup() {
  yield takeLatest(POST_SIGNUP_REGISTER, postSignupRegisterSaga);
}

export const postSignupRegister = (data: any) => ({
  type: POST_SIGNUP_REGISTER,
  payload: { data },
});

export const resetPostSignupRegister = () => {
  return {
    type: POST_SIGNUP_REGISTER_RESET,
  };
};
