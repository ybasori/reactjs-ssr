import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./global.css";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
