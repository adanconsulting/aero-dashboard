export const LOAD_NOTIFICATIONS = "ADMIN_LOAD_NOTIFICATIONS";

const initialState = {};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    default:
      return state;
  }
};

export default AdminReducer;
