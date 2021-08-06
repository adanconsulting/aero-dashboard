import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

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

const FileSkeleton = (props) => {
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
      return 4;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 3;
    } else if (screenMedium) {
      return 3;
    } else if (screenSmall) {
      return 2;
    } else if (screenExtraSmall) {
      return 1;
    } else {
      return 3;
    }
  };

  const files = [];
  for (let i = 0; i < props.count; i++) {
    files.push(
      <GridListTile key={i}>
        <Card>
          <CardHeader
            avatar={<Skeleton variant="circle" width={40} height={40} />}
            title={<Skeleton animation="wave" width={200} />}
            subheader={<Skeleton animation="wave" width={170} />}
          />
        </Card>
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
        <GridList
          cellHeight={100}
          spacing={24}
          cols={getScreenWidth()}
          style={{ width: "100%" }}
        >
          {files}
        </GridList>
      </div>
    </>
  );
};

FileSkeleton.propTypes = {
  count: PropTypes.number.isRequired,
};

FileSkeleton.defaultProps = {
  count: 7,
};

export default FileSkeleton;
