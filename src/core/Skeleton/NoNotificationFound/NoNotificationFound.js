import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.divider,
  },
  icon: {
    width: 200,
    height: 200,
  },
}));

const NoNotificationFound = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <NotificationsOffIcon className={classes.icon} />
      <Typography variant="h1">No Notification</Typography>
    </Grid>
  );
};

export default NoNotificationFound;
