import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import MuiToolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PhotoActions from "store/actions/photo_actions";

import CircularLoading from "core/Skeleton/CircularLoading";
import AlbumMenu from "./components/AlbumMenu";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".ReactModal__Overlay": {
      top: `${theme.mixins.toolbar.minHeight}px !important`,
      left: "72px !important",
    },
    ".ReactModal__Overlay .ril-toolbar": {
      backgroundColor: "transparent!important",
    },
    // ".ReactModal__Overlay .ril-caption": {
    //   backgroundColor: "transparent!important",
    // },
  },
  appbar: {
    flexGrow: 1,
    borderRadius: 5,
    marginBottom: theme.spacing(1),
    zIndex: 2,
  },
  selectButton: {
    flexGrow: 1,
  },
}));

const checkSelectALl = createSelector(
  (state) => state.photo,
  (_, info) => info,
  (photo, info) =>
    photo[info.propertyId].collections.find(
      (collection) => collection.id === info.albumId
    ).selectAll
);

const Toolbar = (props) => {
  const { info, photos } = props;
  const history = useHistory();
  const classes = useStyles();

  const collectionName = useRef("Default Album");

  const getAlbumName = (name) => {
    collectionName.current = name;
  };

  const [isLoading, showLoading] = useState(false);

  const isSelectAll = useSelector((state) => checkSelectALl(state, info));

  const toggleSelectAll = (value) => {
    PhotoActions.toggleSelectAllPhotos(info.propertyId, info.albumId, value);
  };

  const getSelectedPhotos = () => {
    const selectedPhotos = [];
    photos.forEach((photo) => {
      if (photo.selected) {
        selectedPhotos.push(photo);
      }
    });

    return selectedPhotos;
  };

  const onExportPhotos = async () => {
    showLoading(true);
    const photos = getSelectedPhotos();
    if (props.onExport) await props.onExport(photos);
    toggleSelectAll(false);
    showLoading(false);
  };

  const onDeletePhotos = async () => {
    showLoading(true);
    const photos = getSelectedPhotos();
    if (props.onDelete) await props.onDelete(photos);
    toggleSelectAll(false);
    PhotoActions.deleteAlbumPhotos(info.propertyId, info.albumId, photos);
    showLoading(false);
  };

  const onUploadPhotos = () => {
    history.push({
      pathname: `/property/files-photos/new-photos/${info.propertyId}/${info.albumId}`,
      state: {
        collectionName: collectionName.current,
      },
    });
  };

  const renderOptions = () => (
    <>
      <Tooltip title="Export">
        <IconButton color="inherit" onClick={onExportPhotos}>
          <SaveAltIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="inherit" onClick={onDeletePhotos}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Upload">
        <IconButton color="inherit" onClick={onUploadPhotos}>
          <CloudUploadIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const renderLoading = () => {
    return <CircularLoading size={30} />;
  };

  return (
    <AppBar className={classes.appbar} position="sticky" color="inherit">
      <MuiToolbar variant="dense">
        {isSelectAll ? (
          <Tooltip title="Unselect">
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => toggleSelectAll(false)}
            >
              <CheckBoxIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Select all">
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => toggleSelectAll(true)}
            >
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          </Tooltip>
        )}
        <AlbumMenu propertyId={info.propertyId} onAlbumChange={getAlbumName} />
        <div className={classes.selectButton} />
        {isLoading ? renderLoading() : renderOptions()}
      </MuiToolbar>
    </AppBar>
  );
};

Toolbar.propTypes = {
  photos: PropTypes.array.isRequired,
  info: PropTypes.exact({
    propertyId: PropTypes.string.isRequired,
    albumId: PropTypes.string.isRequired,
  }),
  onExport: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Toolbar);
