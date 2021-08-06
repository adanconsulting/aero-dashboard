import { not_in_array } from "core/utils/array_util";

export const TOGGLE_SELECT = "PHOTO_TOGGLE_SELECT";
export const TOGGLE_SELECT_ALL_PHOTOS = "PHOTO_TOGGLE_SELECT_ALL_PHOTOS";
export const SELECT_ALBUM = "PHOTO_SELECT_ALBUM";
export const DELETE_ALBUM_PHOTOS = "PHOTO_DELETE_ALBUM_PHOTOS";
export const LOAD_PHOTOS = "PHOTO_LOAD_PHOTOS";
export const ADD_NEW_PHOTOS = "PHOTO_ADD_NEW_PHOTOS";

const initialState = {};

const selectPhoto = (state, action) => {
  const newState = Object.assign({}, state);
  const albumPhotos = newState[action.propertyId][action.albumId];
  const newPhotos = albumPhotos.map((photo) => {
    if (photo.photo_id === action.selectedPhotoId) {
      return {
        ...photo,
        selected: action.selected,
      };
    }

    return photo;
  });

  newState[action.propertyId][action.albumId] = newPhotos;
  return newState;
};

const selectAllPhotos = (state, action) => {
  const newState = Object.assign({}, state);
  const newCollections = newState[action.propertyId].collections.map(
    (collection) => {
      if (collection.id === action.albumId) {
        return {
          ...collection,
          selectAll: action.selectAll,
        };
      }
      return collection;
    }
  );
  newState[action.propertyId].collections = newCollections;
  const albumPhotos = newState[action.propertyId][action.albumId];
  const newPhotos = albumPhotos.map((photo) => {
    return {
      ...photo,
      selected: action.selectAll,
    };
  });

  newState[action.propertyId][action.albumId] = newPhotos;

  return newState;
};

const selectAlbum = (state, action) => {
  const newState = Object.assign({}, state);
  newState[action.propertyId].selectedAlbum = action.albumId;
  return newState;
};

const deleteAlbumPhotos = (state, action) => {
  const deletePhotos = action.photos.reduce((r, o) => {
    r.push(o.photo_id);
    return r;
  }, []);

  const newState = Object.assign({}, state);
  const albumPhotos = newState[action.propertyId][action.albumId];
  const newPhotos = [];
  albumPhotos.forEach((photo) => {
    if (not_in_array(deletePhotos, photo.photo_id)) {
      newPhotos.push(photo);
    }
  });

  newState[action.propertyId][action.albumId] = newPhotos;
  return newState;
};

const addNewPhotos = (state, action) => {
  const newState = Object.assign({}, state);
  newState[action.propertyId][action.albumId].push(action.newPhoto);
  return newState;
};

const PhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PHOTOS:
      return {
        ...state,
        [action.propertyId]: action.data,
      };
    case TOGGLE_SELECT:
      return selectPhoto(state, action);
    case TOGGLE_SELECT_ALL_PHOTOS:
      return selectAllPhotos(state, action);
    case SELECT_ALBUM:
      return selectAlbum(state, action);
    case DELETE_ALBUM_PHOTOS:
      return deleteAlbumPhotos(state, action);
    case ADD_NEW_PHOTOS:
      return addNewPhotos(state, action);
    default:
      return state;
  }
};

export default PhotoReducer;
