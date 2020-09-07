import React, { useState, useEffect } from "react";
import {
  Route,
  Link,
  useRouteMatch,
  useHistory,
  Switch,
  useLocation,
} from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Main from "./Main";
import Create from "./Create";
import Detail from "./Detail";
import Edit from "./Edit";

const Blog = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      transform: "translate(100%,0)",
      position: "absolute",
      top: 80,
    },
    enter: {
      opacity: 1,
      transform: "translate(0%,0)",
      position: "static",
    },
    leave: {
      opacity: 0,
      transform: "translate(-50%,0)",
      position: "absolute",
      top: 80,
    },
  });

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
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={{ ...props, width: "100%" }}>
              <Switch location={item}>
                <Route exact path={`${path}/create`}>
                  <Create />
                </Route>
                <Route path={`${path}/:id/edit`}>
                  <Edit />
                </Route>
                <Route path={`${path}/:id`}>
                  <Detail />
                </Route>
                <Route exact path={`${path}`}>
                  <Main />
                </Route>
              </Switch>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
