import store from "../store";

import { LOAD_PROPERTIES_MAP } from "../reducers/map_reducer";

const loadPropertiesMap = (data) => {
  store.dispatch({ type: LOAD_PROPERTIES_MAP, data: data });
};

const MapActions = {
  loadPropertiesMap,
};

export default MapActions;
