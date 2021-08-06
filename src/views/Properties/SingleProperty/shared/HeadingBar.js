import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& h3": {
      margin: 0,
    },
  },
}));

const HeadingBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>{props.title}</h3>
    </div>
  );
};

HeadingBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadingBar;
