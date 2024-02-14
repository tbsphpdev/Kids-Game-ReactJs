import React, { Fragment } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { isAuthenticated } from "./Util";


const UnAuthRoutes = ({ component: Component, ...rest }) => {
    const history = useHistory()
  return (
    <Route
      {...rest}
      render = {props =>
        !isAuthenticated()? <Component {...props} />:
        history.push("/quests")
      }
    />
  );
};

export default UnAuthRoutes;