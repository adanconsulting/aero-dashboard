export const LOGOUT = "USER_LOGOUT";
export const SIGNIN = "USER_SIGNIN";
export const UPDATE_USER = "USER_UPDATE_USER";
export const LOAD_ALL_USERS = "USER_LOAD_ALL_USERS";

const localUserData = () => {
  if (localStorage.getItem("userData") !== null) {
    return JSON.parse(localStorage.getItem("userData"));
  }
  return {};
};

const initialState = localUserData();

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      localStorage.setItem("userData", JSON.stringify(action.userData));
      return { ...action.userData };
    case UPDATE_USER:
      const newState = {
        ...state,
        ...action.updatedData,
      };
      localStorage.setItem("userData", JSON.stringify(newState));
      return newState;
    case LOAD_ALL_USERS: {
      return {
        ...state,
        allUsers: action.data,
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
