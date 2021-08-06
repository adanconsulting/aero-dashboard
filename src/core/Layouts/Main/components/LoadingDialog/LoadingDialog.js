import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import CircularLoading from "core/Skeleton/CircularLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: theme.mixins.toolbar.minHeight,
    right: 50,
    zIndex: 11,
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const loadingInfo = createSelector(
  (state) => state.app,
  (app) => app.loading
);

const LoadingDialog = () => {
  const classes = useStyles();
  const loading = useSelector(loadingInfo);

  if (!loading.show) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <CircularLoading />
        <Typography variant="body2">{loading.message}</Typography>
      </Paper>
    </div>
  );
};

export default LoadingDialog;
