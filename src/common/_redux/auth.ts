import { put, delay, takeEvery } from "redux-saga/effects";

import api from "../_configs/api";
import { Action, AuthState } from "./types";

const POST_AUTH_AUTHENTICATE = "POST_AUTH_AUTHENTICATE_INDEX";
const POST_AUTH_AUTHENTICATE_LOADING = "POST_AUTH_AUTHENTICATE_LOADING";
const POST_AUTH_AUTHENTICATE_SUCCESS = "POST_AUTH_AUTHENTICATE_SUCCESS";
const POST_AUTH_AUTHENTICATE_ERROR = "POST_AUTH_AUTHENTICATE_ERROR";
const POST_AUTH_AUTHENTICATE_RESET = "POST_AUTH_AUTHENTICATE_RESET";

const AUTH_CHECK_TIMEOUT = "AUTH_CHECK_TIMEOUT";
const CHECK_AUTH = "CHECK_AUTH";

const initState: AuthState = {
  isLoadingPostAuthAuthenticate: false,
  auth: null,
  errorPostAuthAuthenticate: null,
};

const auth = (state = initState, action: Action) => {
  switch (action.type) {
    case POST_AUTH_AUTHENTICATE_LOADING:
      return {
        ...state,
        isLoadingPostAuthAuthenticate: true,
        auth: null,
        errorPostAuthAuthenticate: null,
      };

    case POST_AUTH_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isLoadingPostAuthAuthenticate: false,
        auth: action.payload.data,
        errorPostAuthAuthenticate: null,
      };

    case POST_AUTH_AUTHENTICATE_ERROR:
      return {
        ...state,
        isLoadingPostAuthAuthenticate: false,
        auth: null,
        errorPostAuthAuthenticate: action.payload,
      };

    case POST_AUTH_AUTHENTICATE_RESET:
      return {
        ...state,
        isLoadingPostAuthAuthenticate: false,
        auth: null,
        errorPostAuthAuthenticate: null,
      };
    default:
      return { ...state };
  }
};

export default auth;

export const resetPostAuthAuthenticate = () => {
  localStorage.removeItem("_myapp.auth");
  return {
    type: POST_AUTH_AUTHENTICATE_RESET,
  };
};

function* postAuthAuthenticateSaga(action: Action) {
  try {
    yield put({ type: POST_AUTH_AUTHENTICATE_LOADING });
    let data = action.payload.data;
    let formdata = new FormData();
    Object.keys(data).map((key) => {
      formdata.append(key, data[key]);
      return key;
    });
    const result = yield api.postAuthAuthenticate(formdata);

    yield delay(1000);
    yield localStorage.setItem("_myapp.auth", JSON.stringify(result.data.data));
    yield put({ type: POST_AUTH_AUTHENTICATE_SUCCESS, payload: result.data });
    yield put({ type: AUTH_CHECK_TIMEOUT, payload: result.data });
  } catch (err) {
    yield put({ type: POST_AUTH_AUTHENTICATE_ERROR, payload: err });
  }
}

function* checkAuthTimeoutSaga(action: Action) {
  yield delay(action.payload.data.expiresAt - new Date().getTime());
  yield put(resetPostAuthAuthenticate());
}

function* checkAuthSaga() {
  let userString = yield localStorage.getItem("_myapp.auth");
  const user = JSON.parse(userString);
  if (!user) {
    yield put(resetPostAuthAuthenticate());
  } else {
    yield put({
      type: POST_AUTH_AUTHENTICATE_SUCCESS,
      payload: { data: user },
    });
    yield put({ type: AUTH_CHECK_TIMEOUT, payload: { data: user } });
  }
}

export function* watchAuth() {
  yield takeEvery(POST_AUTH_AUTHENTICATE, postAuthAuthenticateSaga);
  yield takeEvery(CHECK_AUTH, checkAuthSaga);
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}

export const postAuthAuthenticate = (data: any) => ({
  type: POST_AUTH_AUTHENTICATE,
  payload: { data },
});

export const checkAuth = () => ({
  type: CHECK_AUTH,
});
