import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import About from "./Pages/About";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
