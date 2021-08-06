import React from "react";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: 10,
  },
}));

const PhotoAvatar = (props) => {
  const classes = useStyles();

  const { data } = props;

  if (data.photo) {
    return (
      <Avatar
        variant="square"
        className={classes.largeAvatar}
        src={data.photo}
      />
    );
  }

  return (
    <Avatar variant="square" className={classes.largeAvatar}>
      <HomeIcon />
    </Avatar>
  );
};

PhotoAvatar.propTypes = {
  data: PropTypes.object,
};

export default PhotoAvatar;
