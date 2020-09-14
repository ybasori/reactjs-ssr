import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "../Pages/LandingPage";
import About from "../Pages/About";

import Navbar from "../Components/Navbar";

const Routes = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
