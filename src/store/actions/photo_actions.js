import store from "../store";

import {
  LOAD_PHOTOS,
  TOGGLE_SELECT,
  TOGGLE_SELECT_ALL_PHOTOS,
  SELECT_ALBUM,
  DELETE_ALBUM_PHOTOS,
  ADD_NEW_PHOTOS,
} from "../reducers/photo_reducer";

const loadPhotos = (propertyId, data) => {
  store.dispatch({
    type: LOAD_PHOTOS,
    propertyId: propertyId,
    data: data,
  });
};

const toggleSelect = (propertyId, albumId, selectedPhotoId, selected) => {
  store.dispatch({
    type: TOGGLE_SELECT,
    propertyId: propertyId,
    albumId: albumId,
    selectedPhotoId: selectedPhotoId,
    selected: selected,
  });
};

const toggleSelectAllPhotos = (propertyId, albumId, selectAll) => {
  store.dispatch({
    type: TOGGLE_SELECT_ALL_PHOTOS,
    propertyId: propertyId,
    albumId: albumId,
    selectAll: selectAll,
  });
};

const selectAlbum = (propertyId, albumId) => {
  store.dispatch({
    type: SELECT_ALBUM,
    propertyId: propertyId,
    albumId: albumId,
  });
};

const deleteAlbumPhotos = (propertyId, albumId, photos) => {
  store.dispatch({
    type: DELETE_ALBUM_PHOTOS,
    propertyId: propertyId,
    albumId: albumId,
    photos: photos,
  });
};

const addNewPhotos = (propertyId, albumId, newPhoto) => {
  store.dispatch({
    type: ADD_NEW_PHOTOS,
    propertyId: propertyId,
    albumId: albumId,
    newPhoto: newPhoto,
  });
};

const PhotoActions = {
  loadPhotos,
  toggleSelect,
  toggleSelectAllPhotos,
  selectAlbum,
  deleteAlbumPhotos,
  addNewPhotos,
};

export default PhotoActions;
