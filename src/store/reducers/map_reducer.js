export const LOAD_PROPERTIES_MAP = "MAP_LOAD_PROPERTIES_MAP";

const initialState = {};

const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROPERTIES_MAP:
      return {
        ...state,
        all: action.data,
      };
    default:
      return state;
  }
};

export default MapReducer;
