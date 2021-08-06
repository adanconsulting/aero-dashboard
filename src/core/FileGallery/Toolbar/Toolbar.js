import React, { useState } from "react";
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

import FileActions from "store/actions/file_actions";

import CircularLoading from "core/Skeleton/CircularLoading";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  (state) => state.file,
  (_, propertyId) => propertyId,
  (file, propertyId) => file[propertyId].selectAll
);

const Toolbar = (props) => {
  const { propertyId, files } = props;
  const history = useHistory();

  const classes = useStyles();

  const [isLoading, showLoading] = useState(false);

  const isSelectAll = useSelector((state) => checkSelectALl(state, propertyId));

  const toggleSelectAll = (value) => {
    FileActions.toggleSelectAllFiles(propertyId, value);
  };

  const getSelectedFiles = () => {
    const selectedFiles = [];
    files.forEach((file) => {
      if (file.selected) {
        selectedFiles.push(file);
      }
    });

    return selectedFiles;
  };

  const onExportFiles = async () => {
    showLoading(true);
    const files = getSelectedFiles();
    if (props.onExport) await props.onExport(files);
    toggleSelectAll(false);
    showLoading(false);
  };

  const onDeleteFiles = async () => {
    showLoading(true);
    const files = getSelectedFiles();
    if (props.onDelete) await props.onDelete(files);
    toggleSelectAll(false);
    FileActions.deleteFiles(propertyId, files);
    showLoading(false);
  };

  const onUploadFiles = () => {
    history.push({
      pathname: `/property/files-photos/new-files/${propertyId}`,
    });
  };

  const renderOptions = () => (
    <>
      <Tooltip title="Export">
        <IconButton color="inherit" onClick={onExportFiles}>
          <SaveAltIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="inherit" onClick={onDeleteFiles}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Upload">
        <IconButton color="inherit" onClick={onUploadFiles}>
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
        <Typography>{isSelectAll ? "Unselect" : "Select all"}</Typography>
        <div className={classes.selectButton} />
        {isLoading ? renderLoading() : renderOptions()}
      </MuiToolbar>
    </AppBar>
  );
};

Toolbar.propTypes = {
  files: PropTypes.array.isRequired,
  propertyId: PropTypes.string.isRequired,
  onExport: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Toolbar);
