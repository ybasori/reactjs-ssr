import React, { useState, useEffect } from "react";
import {
  Route,
  Link,
  useRouteMatch,
  useHistory,
  Switch,
} from "react-router-dom";

import Main from "./Main";
import Create from "./Create";
import Detail from "./Detail";

const Blog = () => {
  const [statePath, setStatePath] = useState("");
  const history = useHistory();
  const { pathname } = history.location;
  const { path } = useRouteMatch();

  const getNavLinkClass = (path, sp) => {
    return sp === path ? "is-active" : "";
  };

  useEffect(() => {
    setStatePath(pathname);
  }, [pathname]);

  return (
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
            <Route exact path={`${path}/create`}>
              <Create />
            </Route>
            <Route path={`${path}/:id`}>
              <Detail />
            </Route>
            <Route exact path={`${path}`}>
              <Main />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Blog;
