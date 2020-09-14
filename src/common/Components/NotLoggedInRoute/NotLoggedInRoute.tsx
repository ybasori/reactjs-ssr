import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import { Reducers } from "../../_redux/types";

const NotLoggedInRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const authState = useSelector((state: Reducers) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authState.auth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

export default NotLoggedInRoute;
