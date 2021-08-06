import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 400,
    padding: theme.spacing(2),
  },
  chatItem: {
    marginBottom: theme.spacing(2),
  },
}));

const ChatLeft = ({ chat }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.chatItem}>
      <Grid container>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Tooltip title={chat.name} placement="left-start">
                <Avatar src={chat.userPhoto}>
                  {!chat.userPhoto && chat.name.charAt(0).toUpperCase()}
                </Avatar>
              </Tooltip>
            </Grid>
            <Grid item xs>
              <Typography>{chat.message}</Typography>
              <Typography variant="caption" color="textSecondary">
                {chat.created_on}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </ListItem>
  );
};

ChatLeft.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default ChatLeft;
