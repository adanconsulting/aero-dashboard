export const LOAD_NOTIFICATIONS = "NOTIFICATION_LOAD_NOTIFICATION";
export const READ_NOTIFICATIONS = "NOTIFICATION_READ_NOTIFICATION";

const initialState = {
  loading: true,
  readAll: true,
  messages: [],
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return { ...action.data, loading: false };
    case READ_NOTIFICATIONS:
      return {
        ...state,
        readAll: true,
      };
    default:
      return state;
  }
};

export default NotificationReducer;
