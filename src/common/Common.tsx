import React from "react";
import { Provider } from "react-redux";

import { store } from "./_redux";

import App from "./App";
import "./global.scss";

const Common = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Common;
