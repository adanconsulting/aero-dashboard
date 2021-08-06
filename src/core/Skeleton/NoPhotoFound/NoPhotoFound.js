import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import WallpaperIcon from "@material-ui/icons/Wallpaper";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.divider,
  },
  icon: {
    width: 200,
    height: 200,
  },
}));

const NoImageFound = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <WallpaperIcon className={classes.icon} />
      <Typography variant="h1">No Photos</Typography>
    </Grid>
  );
};

export default NoImageFound;
