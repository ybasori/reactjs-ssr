import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const NotLoggedInRoute = ({ children, ...rest }) => {
  const authState = useSelector((state) => state.auth);

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
