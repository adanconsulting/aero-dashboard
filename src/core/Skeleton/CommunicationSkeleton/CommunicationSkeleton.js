import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import ChatRightSkeleton from "./components/ChatRightSkeleton";
import ChatLeftSkeleton from "./components/ChatLeftSkeleton";

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    margin: "auto",
  },
  chatArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const CommunicationSkeleton = (props) => {
  const classes = useStyles();
  const { rows } = props;

  const chatData = [];

  for (let i = 0; i < rows; i++) {
    if (i % 2 === 0) {
      chatData.push(<ChatRightSkeleton key={i} />);
    } else {
      chatData.push(<ChatLeftSkeleton key={i} />);
    }
  }

  return (
    <Grid className={classes.root} container direction="column">
      <List className={classes.chatArea}>{chatData}</List>
    </Grid>
  );
};

CommunicationSkeleton.propTypes = {
  rows: PropTypes.number.isRequired,
};

export default CommunicationSkeleton;
