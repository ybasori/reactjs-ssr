import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { checkAuth } from "./_redux/auth";

const App = () => {
  const dispatch = useDispatch();
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
            <Route path="/Signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </section>
    </div>
  );
};

export default App;
