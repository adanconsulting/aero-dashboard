import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const PhotoPicker = (props) => {
  const theme = useTheme();

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="photo-picker"
        type="file"
        onChange={props.onChange}
      />
      <label htmlFor="photo-picker">
        <Tooltip title="Create new property from photo">
          <Fab color={theme.palette.common.primary} component="span">
            <AddPhotoAlternateIcon />
          </Fab>
        </Tooltip>
      </label>
    </>
  );
};

PhotoPicker.porpTypes = {
  onChange: PropTypes.func.isRequired,
};

export default PhotoPicker;
