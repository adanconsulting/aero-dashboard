import store from "../store";

import { LOAD_NOTIFICATIONS } from "../reducers/admin_reducer";

const loadNotifications = (notifications) => {
  store.dispatch({
    type: LOAD_NOTIFICATIONS,
    notifications: notifications,
  });
};

const AdminActions = {
  loadNotifications,
};

export default AdminActions;
