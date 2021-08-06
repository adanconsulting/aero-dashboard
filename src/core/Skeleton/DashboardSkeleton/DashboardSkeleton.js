import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import Grid from "@material-ui/core/Grid";
import TableSkeleton from "../TableSkeleton";

const DashboardSkeleton = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Skeleton animation="wave" variant="rect" height={150} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Skeleton animation="wave" variant="rect" height={150} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Skeleton animation="wave" variant="rect" height={150} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Skeleton animation="wave" variant="rect" height={150} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <TableSkeleton rows={7} cols={5} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <Skeleton animation="wave" variant="rect" height={400} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardSkeleton;
