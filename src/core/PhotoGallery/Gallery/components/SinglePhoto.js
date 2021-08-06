import React from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { shallowEqual } from "react-redux";
import PhotoActions from "store/actions/photo_actions";
import DateFormat from "core/utils/DateFormat";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "auto",
    height: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const SinglePhoto = (props) => {
  const classes = useStyles();
  const { tile, info, imageIndex } = props;

  const toggleSelection = (value) => {
    PhotoActions.toggleSelect(
      info.propertyId,
      info.albumId,
      tile.photo_id,
      value
    );
  };

  return (
    <GridListTile cols={tile.cols || 1} style={{ ...props.style }}>
      <LazyLoadImage
        src={tile.url}
        alt={tile.name}
        onClick={() => props.onClick(imageIndex, tile.photo_id)}
        placeholderSrc={tile.placeholder}
        width="100%"
        height="100%"
      />

      <GridListTileBar
        title={tile.name}
        subtitle={<DateFormat date={tile.created_on} />}
        actionIcon={
          tile.selected ? (
            <IconButton
              value={tile.photo_id}
              onClick={() => toggleSelection(false)}
            >
              <CheckCircleIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton
              className={classes.icon}
              value={tile.photo_id}
              onClick={() => toggleSelection(true)}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
          )
        }
      />
    </GridListTile>
  );
};

SinglePhoto.propTypes = {
  onClick: PropTypes.func,
  imageIndex: PropTypes.number.isRequired,
  tile: PropTypes.object.isRequired,
  info: PropTypes.exact({
    propertyId: PropTypes.string.isRequired,
    albumId: PropTypes.string.isRequired,
  }),
};

export default React.memo(SinglePhoto, (prevState, nextState) => {
  return (
    shallowEqual(prevState.tile, nextState.tile) &&
    prevState.style.width === nextState.style.width
  );
});
