import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 400,
    padding: theme.spacing(2),
  },
  chatItem: {
    marginBottom: theme.spacing(2),
  },
}));

const ChatRightSkeleton = () => {
  const classes = useStyles();

  return (
    <ListItem className={classes.chatItem}>
      <Grid container justify="flex-end">
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Skeleton animation="wave" variant="text" width={200} />
              <Skeleton animation="wave" variant="text" width={200} />
              <Skeleton animation="wave" variant="text" width={170} />
              <Typography variant="caption" color="textSecondary">
                <Skeleton width={70} height={20} />
              </Typography>
            </Grid>
            <Grid item>
              <Skeleton variant="circle" width={40} height={40} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </ListItem>
  );
};

export default ChatRightSkeleton;
