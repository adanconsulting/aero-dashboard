import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  appbar: {
    flexGrow: 1,
    borderRadius: 5,
    marginBottom: theme.spacing(1),
    zIndex: 2,
  },
  selectButton: {
    flexGrow: 1,
  },
}));

const PhotosSkeleton = (props) => {
  const classes = useStyles();

  const screenExtraLarge = useMediaQuery((theme) =>
    theme.breakpoints.only("xl")
  );
  const screenLarge = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const screenMedium = useMediaQuery((theme) => theme.breakpoints.only("md"));
  const screenSmall = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  const screenExtraSmall = useMediaQuery((theme) =>
    theme.breakpoints.only("xs")
  );
  const screenNarrow = useMediaQuery("(max-width:340px)");

  const getScreenWidth = () => {
    if (screenExtraLarge) {
      return 6;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 5;
    } else if (screenMedium) {
      return 4;
    } else if (screenSmall) {
      return 3;
    } else if (screenExtraSmall) {
      return 2;
    } else {
      return 3;
    }
  };

  const photos = [];
  for (let i = 0; i < props.count; i++) {
    photos.push(
      <GridListTile cols={1} key={i}>
        <Skeleton animation="wave" height={140} />
        <GridListTileBar title={<Skeleton />} subtitle={<Skeleton />} />
      </GridListTile>
    );
  }

  return (
    <>
      <AppBar className={classes.appbar} position="sticky" color="inherit">
        <Toolbar variant="dense">
          <Skeleton animation="wave" variant="text" width={100} />
          <div className={classes.selectButton} />
          <Skeleton animation="wave" variant="rect" width={70} height={30} />
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <GridList cols={getScreenWidth()} style={{ width: "100%" }}>
          {photos}
        </GridList>
      </div>
    </>
  );
};

PhotosSkeleton.propTypes = {
  count: PropTypes.number.isRequired,
};

PhotosSkeleton.defaultProps = {
  count: 7,
};

export default PhotosSkeleton;
