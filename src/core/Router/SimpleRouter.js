import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import ReactGA from "react-ga";

const SimpleRouter = (props) => {
  const { page: Page, path, title } = props;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    ReactGA.set({ page: props.location.pathname });
    ReactGA.pageview(props.location.pathname);
  }, [props.location.pathname]);

  return (
    <Route exact path={path}>
      <Page />
    </Route>
  );
};

export default SimpleRouter;
