import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { shallowEqual } from "react-redux";
import FileActions from "store/actions/file_actions";
import DateFormat from "core/utils/DateFormat";

const useStyles = makeStyles({
  file_link: {
    color: "#212121",
    textDecoration: "none",
    "& hover": {
      textDecoration: "underline",
    },
  },
});

const SingleFile = (props) => {
  const { tile, propertyId } = props;
  const classes = useStyles();

  const toggleSelection = (value) => {
    FileActions.toggleSelect(propertyId, tile.file_id, value);
  };

  return (
    <GridListTile style={{ ...props.style }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <FileCopyIcon />
            </Avatar>
          }
          action={
            tile.selected ? (
              <IconButton
                value={tile.file_id}
                onClick={() => toggleSelection(false)}
              >
                <CheckCircleIcon />
              </IconButton>
            ) : (
              <IconButton
                value={tile.file_id}
                onClick={() => toggleSelection(true)}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            )
          }
          title={
            <a className={classes.file_link} target="_blank" href={tile.url}>
              {tile.name}
            </a>
          }
          subheader={<DateFormat date={tile.created_on} />}
        />
      </Card>
    </GridListTile>
  );
};

SingleFile.propTypes = {
  tile: PropTypes.object.isRequired,
  propertyId: PropTypes.string.isRequired,
};

export default React.memo(SingleFile, (prevState, nextState) => {
  return (
    shallowEqual(prevState.tile, nextState.tile) &&
    prevState.style.width === nextState.style.width
  );
});
