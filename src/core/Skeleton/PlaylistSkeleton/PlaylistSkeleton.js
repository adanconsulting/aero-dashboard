import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  content: {
    flex: "1 0 auto",
  },
  publishOn: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "#333",
  },
}));

const PlaylistSkeleton = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      {["list1", "list2", "list3", "list4"].map((item) => (
        <Card
          key={item}
          className={classes.root}
          style={{ margin: theme.spacing(2) }}
        >
          <Skeleton animation="wave" variant="rect" width={320} height={180} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h6">
                <Skeleton animation="wave" variant="text" />
              </Typography>
              <Skeleton animation="wave" variant="text" width="90%" />
              <Skeleton animation="wave" variant="text" width="80%" />
            </CardContent>
            <div className={classes.publishOn}>
              <Typography variant="subtitle1" color="textSecondary">
                <Skeleton animation="wave" variant="text" width={200} />
              </Typography>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PlaylistSkeleton;
