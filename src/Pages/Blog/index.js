import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import Main from "./Main";
import Create from "./Create";
import Detail from "./Detail";

const Blog = () => {
  const [statePath, setStatePath] = useState("");

  const { path } = useRouteMatch();

  const getNavLinkClass = (path, sp) => {
    return sp === path ? "is-active" : "";
  };

  return (
    <Router>
      <div>
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <div className="tabs is-toggle is-toggle-rounded tab is-fullwidth">
              <ul>
                <li className={getNavLinkClass(path, statePath)}>
                  <Link to={path}>
                    <span className="icon is-small">
                      <i className="fas fa-image"></i>
                    </span>
                    <span>Blog</span>
                  </Link>
                </li>
                <li className={getNavLinkClass(path + "/create", statePath)}>
                  <Link to={`${path}/create`}>
                    <span className="icon is-small">
                      <i className="fas fa-music"></i>
                    </span>
                    <span>Create</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <Switch>
              <Route path={`${path}/create`}>
                <Create
                  setPathname={(name) => {
                    setStatePath(name);
                  }}
                />
              </Route>
              <Route path={`${path}/:id`}>
                <Detail
                  setPathname={(name) => {
                    setStatePath(name);
                  }}
                />
              </Route>
              <Route path={`${path}`}>
                <Main
                  setPathname={(name) => {
                    setStatePath(name);
                  }}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Blog;
