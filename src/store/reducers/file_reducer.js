import { not_in_array } from "core/utils/array_util";

export const TOGGLE_SELECT = "FILE_TOGGLE_SELECT";
export const TOGGLE_SELECT_ALL_FILES = "FILE_TOGGLE_SELECT_ALL_FILES";
export const DELETE_FILES = "FILE_DELETE_FILES";
export const LOAD_FILES = "FILE_LOAD_FILES";
export const ADD_NEW_FILE = "FILE_ADD_NEW_FILE";

const initialState = {};

const selectFile = (state, action) => {
  const newState = Object.assign({}, state);
  const files = newState[action.propertyId].files;
  const newFiles = files.map((file) => {
    if (file.file_id === action.selectedFileId) {
      return {
        ...file,
        selected: action.selected,
      };
    }

    return file;
  });

  newState[action.propertyId].files = newFiles;
  return newState;
};

const selectAllFiles = (state, action) => {
  const newState = Object.assign({}, state);
  newState[action.propertyId].selectAll = action.selectAll;

  const files = newState[action.propertyId].files;
  const newFiles = files.map((file) => {
    return {
      ...file,
      selected: action.selectAll,
    };
  });

  newState[action.propertyId].files = newFiles;

  return newState;
};

const deleteFiles = (state, action) => {
  const deleteFiles = action.files.reduce((r, o) => {
    r.push(o.file_id);
    return r;
  }, []);

  const newState = Object.assign({}, state);
  const files = newState[action.propertyId].files;
  const newFiles = [];
  files.forEach((file) => {
    if (not_in_array(deleteFiles, file.file_id)) {
      newFiles.push(file);
    }
  });

  newState[action.propertyId].files = newFiles;
  return newState;
};

const addNewFile = (state, action) => {
  let newState = Object.assign({}, state);
  if (newState[action.propertyId]) {
    newState[action.propertyId].files.push(action.newFile);
  } else {
    newState = {
      ...newState,
      [action.propertyId]: {
        files: [],
      },
    };
    newState[action.propertyId].files.push(action.newFile);
  }

  return newState;
};

const FileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FILES:
      return {
        ...state,
        [action.propertyId]: action.data,
      };
    case TOGGLE_SELECT:
      return selectFile(state, action);
    case TOGGLE_SELECT_ALL_FILES:
      return selectAllFiles(state, action);
    case DELETE_FILES:
      return deleteFiles(state, action);
    case ADD_NEW_FILE:
      return addNewFile(state, action);
    default:
      return state;
  }
};

export default FileReducer;
