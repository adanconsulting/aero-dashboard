import React, { useState } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import PhotoActions from "store/actions/photo_actions";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import CreateNewAlbum from "./CreateNewAlbum";

const getCollections = createSelector(
  (state) => state.photo,
  (_, propertyId) => propertyId,
  (photo, propertyId) => photo[propertyId].collections
);

const AlbumMenu = (props) => {
  const [openNewAlbum, setOpenNewAlbum] = useState(false);

  const theme = useTheme();

  const collections = useSelector((state) =>
    getCollections(state, props.propertyId)
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const openAlbumCollection = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onSelectAlbum = (albumId, index) => {
    props.onAlbumChange(collections[index].name);
    setSelectedIndex(index);
    setAnchorEl(null);
    PhotoActions.selectAlbum(props.propertyId, albumId);
  };

  const closeAlbumCollection = () => {
    setAnchorEl(null);
  };

  const createNewCollection = () => {
    setOpenNewAlbum(true);
  };

  const handleDialogClose = () => {
    setOpenNewAlbum(false);
  };

  return (
    <div>
      <Button
        onClick={openAlbumCollection}
        variant="contained"
        color={theme.palette.common.primary}
        size="small"
      >
        Albums
      </Button>
      <Typography style={{ marginLeft: theme.spacing(1) }} variant="caption">
        ({collections[selectedIndex].name})
      </Typography>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeAlbumCollection}
      >
        {collections.map((collection, index) => (
          <MenuItem
            key={collection.id}
            selected={index === selectedIndex}
            onClick={() => onSelectAlbum(collection.id, index)}
          >
            {collection.name}
          </MenuItem>
        ))}
        <MenuItem onClick={createNewCollection}>NEW COLLECTION</MenuItem>
      </Menu>

      <CreateNewAlbum
        open={openNewAlbum}
        propertyId={props.propertyId}
        onClose={handleDialogClose}
      />
    </div>
  );
};

AlbumMenu.propTypes = {
  propertyId: PropTypes.string.isRequired,
  onAlbumChange: PropTypes.func.isRequired,
};

export default AlbumMenu;
