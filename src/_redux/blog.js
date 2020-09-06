import { put, takeLatest, delay } from "redux-saga/effects";

import api from "../_configs/api";

const GET_BLOG_INDEX = "GET_BLOG_INDEX";
const GET_BLOG_INDEX_LOADING = "GET_BLOG_INDEX_LOADING";
const GET_BLOG_INDEX_SUCCESS = "GET_BLOG_INDEX_SUCCESS";
const GET_BLOG_INDEX_ERROR = "GET_BLOG_INDEX_ERROR";
const GET_BLOG_INDEX_RESET = "GET_BLOG_INDEX_RESET";

const GET_BLOG_SHOW = "GET_BLOG_SHOW";
const GET_BLOG_SHOW_LOADING = "GET_BLOG_SHOW_LOADING";
const GET_BLOG_SHOW_SUCCESS = "GET_BLOG_SHOW_SUCCESS";
const GET_BLOG_SHOW_ERROR = "GET_BLOG_SHOW_ERROR";
const GET_BLOG_SHOW_RESET = "GET_BLOG_SHOW_RESET";

const POST_BLOG_STORE = "POST_BLOG_STORE_INDEX";
const POST_BLOG_STORE_LOADING = "POST_BLOG_STORE_LOADING";
const POST_BLOG_STORE_SUCCESS = "POST_BLOG_STORE_SUCCESS";
const POST_BLOG_STORE_ERROR = "POST_BLOG_STORE_ERROR";
const POST_BLOG_STORE_RESET = "POST_BLOG_STORE_RESET";

const PUT_BLOG_UPDATE = "PUT_BLOG_UPDATE";
const PUT_BLOG_UPDATE_LOADING = "PUT_BLOG_UPDATE_LOADING";
const PUT_BLOG_UPDATE_SUCCESS = "PUT_BLOG_UPDATE_SUCCESS";
const PUT_BLOG_UPDATE_ERROR = "PUT_BLOG_UPDATE_ERROR";
const PUT_BLOG_UPDATE_RESET = "PUT_BLOG_UPDATE_RESET";

const DELETE_BLOG_DELETE = "DELETE_BLOG_DELETE";
const DELETE_BLOG_DELETE_LOADING = "DELETE_BLOG_DELETE_LOADING";
const DELETE_BLOG_DELETE_SUCCESS = "DELETE_BLOG_DELETE_SUCCESS";
const DELETE_BLOG_DELETE_ERROR = "DELETE_BLOG_DELETE_ERROR";
const DELETE_BLOG_DELETE_RESET = "DELETE_BLOG_DELETE_RESET";

const initState = {
  isLoadingGetBlogIndex: false,
  successGetBlogIndex: null,
  errorGetBlogIndex: null,
  isLoadingGetBlogShow: false,
  successGetBlogShow: null,
  errorGetBlogShow: null,
  isLoadingPostBlogStore: false,
  successPostBlogStore: null,
  errorPostBlogStore: null,
  isLoadingPutBlogUpdate: false,
  successPutBlogUpdate: null,
  errorPutBlogUpdate: null,
  isLoadingDeleteBlogDelete: false,
  successDeleteBlogDelete: null,
  errorDeleteBlogDelete: null,
};

const blog = (state = initState, action) => {
  switch (action.type) {
    case GET_BLOG_INDEX_LOADING:
      return {
        ...state,
        isLoadingGetBlogIndex: true,
        successGetBlogIndex: null,
        errorGetBlogIndex: null,
      };

    case GET_BLOG_INDEX_SUCCESS:
      return {
        ...state,
        isLoadingGetBlogIndex: false,
        successGetBlogIndex: action.payload.data,
        errorGetBlogIndex: null,
      };

    case GET_BLOG_INDEX_ERROR:
      return {
        ...state,
        isLoadingGetBlogIndex: false,
        successGetBlogIndex: null,
        errorGetBlogIndex: action.payload,
      };

    case GET_BLOG_INDEX_RESET:
      return {
        ...state,
        isLoadingGetBlogIndex: false,
        successGetBlogIndex: null,
        errorGetBlogIndex: null,
      };
    case GET_BLOG_SHOW_LOADING:
      return {
        ...state,
        isLoadingGetBlogShow: true,
        successGetBlogShow: null,
        errorGetBlogShow: null,
      };

    case GET_BLOG_SHOW_SUCCESS:
      return {
        ...state,
        isLoadingGetBlogShow: false,
        successGetBlogShow: action.payload.data,
        errorGetBlogShow: null,
      };

    case GET_BLOG_SHOW_ERROR:
      return {
        ...state,
        isLoadingGetBlogShow: false,
        successGetBlogShow: null,
        errorGetBlogShow: action.payload,
      };

    case GET_BLOG_SHOW_RESET:
      return {
        ...state,
        isLoadingGetBlogShow: false,
        successGetBlogShow: null,
        errorGetBlogShow: null,
      };

    case POST_BLOG_STORE_LOADING:
      return {
        ...state,
        isLoadingPostBlogStore: true,
        successPostBlogStore: null,
        errorPostBlogStore: null,
      };

    case POST_BLOG_STORE_SUCCESS:
      return {
        ...state,
        isLoadingPostBlogStore: false,
        successPostBlogStore: action.payload.data,
        errorPostBlogStore: null,
      };

    case POST_BLOG_STORE_ERROR:
      return {
        ...state,
        isLoadingPostBlogStore: false,
        successPostBlogStore: null,
        errorPostBlogStore: action.payload,
      };

    case POST_BLOG_STORE_RESET:
      return {
        ...state,
        isLoadingPostBlogStore: false,
        successPostBlogStore: null,
        errorPostBlogStore: null,
      };

    case PUT_BLOG_UPDATE_LOADING:
      return {
        ...state,
        isLoadingPutBlogUpdate: true,
        successPutBlogUpdate: null,
        errorPutBlogUpdate: null,
      };

    case PUT_BLOG_UPDATE_SUCCESS:
      return {
        ...state,
        isLoadingPutBlogUpdate: false,
        successPutBlogUpdate: action.payload.data,
        errorPutBlogUpdate: null,
      };

    case PUT_BLOG_UPDATE_ERROR:
      return {
        ...state,
        isLoadingPutBlogUpdate: false,
        successPutBlogUpdate: null,
        errorPutBlogUpdate: action.payload,
      };

    case PUT_BLOG_UPDATE_RESET:
      return {
        ...state,
        isLoadingPutBlogUpdate: false,
        successPutBlogUpdate: null,
        errorPutBlogUpdate: null,
      };

    case DELETE_BLOG_DELETE_LOADING:
      return {
        ...state,
        isLoadingDeleteBlogDelete: true,
        successDeleteBlogDelete: null,
        errorDeleteBlogDelete: null,
      };

    case DELETE_BLOG_DELETE_SUCCESS:
      return {
        ...state,
        isLoadingDeleteBlogDelete: false,
        successDeleteBlogDelete: action.payload.data,
        errorDeleteBlogDelete: null,
      };

    case DELETE_BLOG_DELETE_ERROR:
      return {
        ...state,
        isLoadingDeleteBlogDelete: false,
        successDeleteBlogDelete: null,
        errorDeleteBlogDelete: action.payload,
      };

    case DELETE_BLOG_DELETE_RESET:
      return {
        ...state,
        isLoadingDeleteBlogDelete: false,
        successDeleteBlogDelete: null,
        errorDeleteBlogDelete: null,
      };
    default:
      return { ...state };
  }
};

export default blog;

function* getBlogIndexSaga(action) {
  try {
    yield put({ type: GET_BLOG_INDEX_LOADING });
    const result = yield api.getBlogIndex();
    yield delay(1000);
    yield put({ type: GET_BLOG_INDEX_SUCCESS, payload: result.data });
  } catch (err) {
    yield put({ type: GET_BLOG_INDEX_ERROR, payload: err });
  }
}

function* getBlogShowSaga(action) {
  try {
    yield put({ type: GET_BLOG_SHOW_LOADING });
    const result = yield api.getBlogShow(action.payload.id);
    yield delay(1000);
    yield put({ type: GET_BLOG_SHOW_SUCCESS, payload: result.data });
  } catch (err) {
    yield put({ type: GET_BLOG_SHOW_ERROR, payload: err });
  }
}

function* postBlogStoreSaga(action) {
  try {
    yield put({ type: POST_BLOG_STORE_LOADING });
    let data = action.payload.data;
    let formdata = new FormData();
    Object.keys(data).map((key) => {
      formdata.append(key, data[key]);
      return key;
    });
    const result = yield api.postBlogStore(formdata);

    yield delay(1000);
    yield put({ type: POST_BLOG_STORE_SUCCESS, payload: result.data });
  } catch (err) {
    yield put({ type: POST_BLOG_STORE_ERROR, payload: err });
  }
}

function* putBlogUpdateSaga(action) {
  try {
    yield put({ type: PUT_BLOG_UPDATE_LOADING });
    let { data, id } = action.payload;
    let formdata = new FormData();
    Object.keys(data).map((key) => {
      formdata.append(key, data[key]);
      return key;
    });
    const result = yield api.putBlogUpdate(formdata, id);

    yield delay(1000);
    yield put({ type: PUT_BLOG_UPDATE_SUCCESS, payload: result.data });
  } catch (err) {
    yield put({ type: PUT_BLOG_UPDATE_ERROR, payload: err });
  }
}

function* deleteBlogDeleteSaga(action) {
  try {
    let { id } = action.payload;
    yield put({ type: DELETE_BLOG_DELETE_LOADING });
    const result = yield api.deleteBlogDelete(id);

    yield delay(1000);
    yield put({ type: DELETE_BLOG_DELETE_SUCCESS, payload: result });
  } catch (err) {
    yield put({ type: DELETE_BLOG_DELETE_ERROR, payload: err });
  }
}

export function* watchBlog() {
  yield takeLatest(GET_BLOG_INDEX, getBlogIndexSaga);
  yield takeLatest(GET_BLOG_SHOW, getBlogShowSaga);
  yield takeLatest(POST_BLOG_STORE, postBlogStoreSaga);
  yield takeLatest(PUT_BLOG_UPDATE, putBlogUpdateSaga);
  yield takeLatest(DELETE_BLOG_DELETE, deleteBlogDeleteSaga);
}

export const getBlogIndex = () => ({ type: GET_BLOG_INDEX });

export const getBlogShow = (id) => ({ type: GET_BLOG_SHOW, payload: { id } });

export const postBlogStore = (data) => ({
  type: POST_BLOG_STORE,
  payload: { data },
});

export const putBlogUpdate = (data, id) => ({
  type: PUT_BLOG_UPDATE,
  payload: { data, id },
});

export const deleteBlogDelete = (id) => ({
  type: DELETE_BLOG_DELETE,
  payload: { id },
});

export const resetGetBlogIndex = () => ({
  type: GET_BLOG_INDEX_RESET,
});

export const resetGetBlogShow = () => ({
  type: GET_BLOG_SHOW_RESET,
});

export const resetPostBlogStore = () => ({
  type: POST_BLOG_STORE_RESET,
});

export const resetPutBlogUpdate = () => ({
  type: PUT_BLOG_UPDATE_RESET,
});

export const resetDeleteBlogDelete = () => ({
  type: DELETE_BLOG_DELETE,
});
