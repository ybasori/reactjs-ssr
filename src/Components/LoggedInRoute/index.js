import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedInRoute = ({ children, ...rest }) => {
  const authState = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.auth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default LoggedInRoute;
