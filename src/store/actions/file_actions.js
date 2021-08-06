import store from "../store";

import {
  LOAD_FILES,
  TOGGLE_SELECT,
  TOGGLE_SELECT_ALL_FILES,
  DELETE_FILES,
  ADD_NEW_FILE,
} from "../reducers/file_reducer";

const laodFiles = (propertyId, data) => {
  store.dispatch({
    type: LOAD_FILES,
    propertyId: propertyId,
    data: data,
  });
};

const toggleSelect = (propertyId, selectedFileId, selected) => {
  store.dispatch({
    type: TOGGLE_SELECT,
    propertyId: propertyId,
    selectedFileId: selectedFileId,
    selected: selected,
  });
};

const toggleSelectAllFiles = (propertyId, selectAll) => {
  store.dispatch({
    type: TOGGLE_SELECT_ALL_FILES,
    propertyId: propertyId,
    selectAll: selectAll,
  });
};

const deleteFiles = (propertyId, files) => {
  store.dispatch({
    type: DELETE_FILES,
    propertyId: propertyId,
    files: files,
  });
};

const addNewFile = (propertyId, newFile) => {
  store.dispatch({
    type: ADD_NEW_FILE,
    propertyId: propertyId,
    newFile: newFile,
  });
};

const FileActions = {
  laodFiles,
  toggleSelect,
  toggleSelectAllFiles,
  deleteFiles,
  addNewFile,
};

export default FileActions;
