import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  headingBar: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& h3": {
      margin: 0,
    },
  },
  skeletonRow: {
    marginTop: theme.spacing(2),
  },
}));

const PropertySkeleton = (props) => {
  const classes = useStyles();

  const skeletonRows = [];
  for (let i = 0; i < props.rows; i++) {
    skeletonRows.push(
      <Grid
        className={classes.skeletonRow}
        container
        alignItems="center"
        key={i}
      >
        <Hidden smDown>
          <Grid item sm={4}>
            <Typography variant="h6">
              <Skeleton animation="wave" width={150} />
            </Typography>
          </Grid>
        </Hidden>
        <Grid item xs>
          <Skeleton animation="wave" variant="rect" height={30} />
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <div className={classes.headingBar}>
        <Typography variant="h3">
          <Skeleton animation="wave" width={300} />
        </Typography>
      </div>
      {skeletonRows}
    </div>
  );
};

PropertySkeleton.propTypes = {
  rows: PropTypes.number.isRequired,
};

export default PropertySkeleton;
