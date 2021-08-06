import { not_in_array } from "core/utils/array_util";
import { setObject } from "core/utils/object_util";

export const GET_ALL_PROPERTIES = "PROPERTIES_GET_ALL_PROPERTIES";
export const LOAD_ALL_PROPERTIES = "PROPERTIES_LOAD_ALL_PROPERTIES";
export const LOAD_SINGLE_PROPERTY = "PROPERTIES_LOAD_SINGLE_PROPERTY";
export const ADD_NEW_PROPERTY = "PROPERTIES_ADD_NEW_PROPERTY";
export const UPDATE_PROPERTY = "PROPERTY_UPDATE_PROPERTY";
export const DELETE_PROPERTIES = "PROPERTY_DELETE_PROPERTIES";
export const ADD_COMMUNICATION_MESSAGE = "PROPERTY_ADD_COMMUNICATION_MESSAGE";
export const ADD_NEW_FOLLOW_UP_TASK = "PROPERTY_ADD_NEW_FOLLOW_UP_TASK";

const initialState = {
  all: [],
  single: {},
};

const updateProperty = (state, action) => {
  const newState = { ...state };
  setObject(newState, action.updatedData, `single.${action.path}`);
  return newState;
};

const addPropertyCommunication = (state, action) => {
  let newState = Object.assign({}, state);
  if (newState.single[action.propertyId].communication) {
    newState.single[action.propertyId].communication.push(action.data);
  } else {
    newState = {
      ...newState,
      single: {
        ...newState.single,
        [action.propertyId]: {
          ...newState.single[action.propertyId],
          communication: [],
        },
      },
    };
    newState.single[action.propertyId].communication.push(action.data);
  }

  return newState;
};

const addNewFollowUpTask = (state, action) => {
  let newState = Object.assign({}, state);
  if (newState.single[action.propertyId].followUp) {
    newState.single[action.propertyId].followUp.push(action.data);
  } else {
    newState = {
      ...newState,
      single: {
        ...newState.single,
        [action.propertyId]: {
          ...newState.single[action.propertyId],
          followUp: [],
        },
      },
    };
    newState.single[action.propertyId].followUp.push(action.data);
  }

  return newState;
};

const deleteProperties = (state, action) => {
  const newProperties = [];
  state.all.forEach((property) => {
    if (not_in_array(action.propertyIds, property.id)) {
      newProperties.push(property);
    }
  });

  return {
    ...state,
    all: newProperties,
  };
};

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROPERTIES:
      return { ...state };
    case LOAD_ALL_PROPERTIES:
      return {
        ...state,
        all: action.data,
      };
    case LOAD_SINGLE_PROPERTY:
      return {
        ...state,
        single: {
          ...state.single,
          [action.propertyId]: action.data,
        },
      };
    case ADD_NEW_PROPERTY:
      return {
        ...state,
        all: [action.data, ...state.all],
      };
    case UPDATE_PROPERTY:
      return updateProperty(state, action);
    case ADD_COMMUNICATION_MESSAGE:
      return addPropertyCommunication(state, action);
    case ADD_NEW_FOLLOW_UP_TASK:
      return addNewFollowUpTask(state, action);
    case DELETE_PROPERTIES:
      return deleteProperties(state, action);
    default:
      return state;
  }
};

export default PropertyReducer;
