import store from "../store";

import {
  GET_ALL_PROPERTIES,
  LOAD_ALL_PROPERTIES,
  LOAD_SINGLE_PROPERTY,
  ADD_NEW_PROPERTY,
  UPDATE_PROPERTY,
  DELETE_PROPERTIES,
  ADD_COMMUNICATION_MESSAGE,
  ADD_NEW_FOLLOW_UP_TASK,
} from "../reducers/property_reducer";

const getAllProperties = () => {
  store.dispatch({
    type: GET_ALL_PROPERTIES,
  });
};

const loadAllProperties = (data) => {
  store.dispatch({
    type: LOAD_ALL_PROPERTIES,
    data: data,
  });
};

const loadSingleProperty = (propertyId, data) => {
  store.dispatch({
    type: LOAD_SINGLE_PROPERTY,
    propertyId: propertyId,
    data: data,
  });
};

const addNewProperty = (data) => {
  store.dispatch({
    type: ADD_NEW_PROPERTY,
    data: data,
  });
};

const updateProperty = (updatedData, path) => {
  store.dispatch({
    type: UPDATE_PROPERTY,
    path: path,
    updatedData: updatedData,
  });
};

const addCommunicationMessage = (propertyId, data) => {
  store.dispatch({
    type: ADD_COMMUNICATION_MESSAGE,
    propertyId: propertyId,
    data: data,
  });
};

const addFollowUpTask = (propertyId, data) => {
  store.dispatch({
    type: ADD_NEW_FOLLOW_UP_TASK,
    propertyId: propertyId,
    data: data,
  });
};

const deleteProperties = (propertyIds) => {
  store.dispatch({
    type: DELETE_PROPERTIES,
    propertyIds: propertyIds,
  });
};

const PropertyActions = {
  getAllProperties,
  loadAllProperties,
  loadSingleProperty,
  addNewProperty,
  updateProperty,
  addCommunicationMessage,
  addFollowUpTask,
  deleteProperties,
};

export default PropertyActions;
