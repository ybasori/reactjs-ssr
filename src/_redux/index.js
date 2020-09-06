import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import blog, { watchBlog } from "./blog";

const reducers = combineReducers({
  blog,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(
  reducers,
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(middleware)
    : middleware
);

sagaMiddleware.run(watchBlog);

export { store };
