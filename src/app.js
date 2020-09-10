import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { checkAuth } from "./_redux/auth";

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [oneTimeEffect, setOneTimeEffect] = useState(true);
  const routes = () => (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/" component={Home} />
    </Switch>
  );
  const loggedInRoutes = () => (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/" component={Home} />
    </Switch>
  );
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
          {authState.auth ? loggedInRoutes() : routes()}
        </div>
      </section>
    </div>
  );
};

export default App;
