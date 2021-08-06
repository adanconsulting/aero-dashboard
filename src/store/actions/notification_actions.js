import store from "../store";

import {
  LOAD_NOTIFICATIONS,
  READ_NOTIFICATIONS,
} from "../reducers/notification_reducer";

const loadNotification = (data) => {
  store.dispatch({
    type: LOAD_NOTIFICATIONS,
    data: data,
  });
};

const readNotifications = () => {
  store.dispatch({
    type: READ_NOTIFICATIONS,
  });
};

const NotificationActions = {
  loadNotification,
  readNotifications,
};

export default NotificationActions;
