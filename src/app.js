import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./_redux";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import About from "./Pages/About";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <section className="section">
          <div className="container">
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/blog">
                <Blog />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </section>
      </div>
    </Provider>
  );
};

export default App;
