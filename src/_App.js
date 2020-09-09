import React from "react";
import { Provider } from "react-redux";

import { store } from "./_redux";

import App from "./App";
import "./global.css";

const _App = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default _App;
