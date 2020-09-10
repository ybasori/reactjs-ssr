import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth } from "./_redux/auth";

import Navbar from "./Components/Navbar";
import NotLoggedInRoute from "./Components/NotLoggedInRoute";

import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [oneTimeEffect, setOneTimeEffect] = useState(true);
  useEffect(() => {
    if (oneTimeEffect) {
      setOneTimeEffect(false);
      dispatch(checkAuth());
    }
  }, [oneTimeEffect]);
  return (
    <div>
      <Navbar />
      <section className="section">
        <div className="container">
          <Switch>
            <NotLoggedInRoute path="/signup">
              <Signup />
            </NotLoggedInRoute>
            <NotLoggedInRoute path="/login">
              <Login />
            </NotLoggedInRoute>
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/" component={Home} />
            <Route path="**" component={NotFound} />
          </Switch>
        </div>
      </section>
    </div>
  );
};

export default App;
