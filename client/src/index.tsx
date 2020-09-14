import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

import "./global.scss";

hydrate(
  <Router>
    <Routes />
  </Router>,
  document.querySelector("#root")
);
