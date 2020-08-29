import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "../Pages/LandingPage";
import About from "../Pages/About";

import Navbar from "../Components/Navbar";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
