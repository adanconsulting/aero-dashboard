import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ReactGA from "react-ga";

import jwt from "jsonwebtoken";
import { isEmptyObject } from "core/utils/object_util";

const getuser = createSelector(
  (state) => state.user,
  (user) => user
);

const Router = (props) => {
  const {
    component: Component,
    layout: Layout,
    privateRoute,
    layoutTitle,
    ...rest
  } = props;

  useEffect(() => {
    document.title = layoutTitle;
  }, [layoutTitle]);

  useEffect(() => {
    ReactGA.set({ page: props.location.pathname });
    ReactGA.pageview(props.location.pathname);
  }, [props.location.pathname]);

  const user = useSelector(getuser);

  if (!user || isEmptyObject(user)) {
    return <Redirect to="/sign-in" />;
  }

  const decodeToken = jwt.decode(user.token);
  const tokenExpire = Date.now() >= decodeToken.exp * 1000;

  if (privateRoute) {
    if (!user.is_login || tokenExpire) {
      return <Redirect to="/sign-in" />;
    }
  }

  if (user.account.expire) {
    return <Redirect to="/expire-account" />;
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout title={layoutTitle}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

Router.propTypes = {
  layout: PropTypes.any.isRequired,
  layoutTitle: PropTypes.string,
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
  privateRoute: PropTypes.bool,
};

export default Router;
