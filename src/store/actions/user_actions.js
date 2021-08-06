import store from "../store";

import {
  LOGOUT,
  SIGNIN,
  UPDATE_USER,
  LOAD_ALL_USERS,
} from "../reducers/user_reducer";

const logout = () => {
  store.dispatch({ type: LOGOUT });
};

const signin = (userData) => {
  store.dispatch({ type: SIGNIN, userData: userData });
};

const updateUser = (updatedData) => {
  store.dispatch({
    type: UPDATE_USER,
    updatedData: updatedData,
  });
};

const loadAllUsers = (data) => {
  store.dispatch({
    type: LOAD_ALL_USERS,
    data: data,
  });
};

const UserActions = {
  logout,
  signin,
  updateUser,
  loadAllUsers,
};

export default UserActions;
