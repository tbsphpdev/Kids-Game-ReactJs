import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./Util";


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render = {props =>
        isAuthenticated()&& isAuthenticated().token? <Component {...props} />:
         (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
