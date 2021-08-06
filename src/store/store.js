import { createStore, combineReducers } from "redux";
import AppReducer from "./reducers/app_reducer";
import UserReducer, { LOGOUT } from "./reducers/user_reducer";
import PhotoReducer from "./reducers/photo_reducer";
import FileReducer from "./reducers/file_reducer";
import DashboardReducer from "./reducers/dashboard_reducer";
import PropertyReducer from "./reducers/property_reducer";
import VendorReducer from "./reducers/vendor_reducer";
import MapReducer from "./reducers/map_reducer";
import NotificationReducer from "./reducers/notification_reducer";
import AdminReducer from "./reducers/admin_reducer";

const reducers = combineReducers({
  app: AppReducer,
  user: UserReducer,
  photo: PhotoReducer,
  file: FileReducer,
  dashboard: DashboardReducer,
  property: PropertyReducer,
  vendor: VendorReducer,
  map: MapReducer,
  notification: NotificationReducer,
  admin: AdminReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === LOGOUT) {
    localStorage.setItem("userData", null);
    state = undefined;
  }

  return reducers(state, action);
};

const store = createStore(rootReducer);

export default store;
