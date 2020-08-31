import React from "react";
import { hydrate } from "react-dom";

import App from "./App";
import "./global.css";

hydrate(<App />, document.querySelector("#root"));
