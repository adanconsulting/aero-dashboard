import store from "../store";

import {
  TOGGLE_MOBILE_MENU,
  TOGGLE_DARK_MODE,
  TOGGLE_SIDE_BAR,
  TOGGLE_NOTIFICATION_DRAWER,
  SELECT_DRAWER_MENU,
  SET_SEARCH_INPUT_REF,
  SET_SEARCH_PLACEHOLDER,
  SET_SEARCH_VISIBILITY,
  SHOW_LOADING_DIALOG,
} from "../reducers/app_reducer";

const toggleMobileMenu = (event) => {
  let evt = null;
  if (event) {
    evt = event.currentTarget;
  }
  store.dispatch({ type: TOGGLE_MOBILE_MENU, evt: evt });
};

const toggleDarkMode = () => {
  store.dispatch({ type: TOGGLE_DARK_MODE });
};

const toggleSideBar = (value) => {
  store.dispatch({ type: TOGGLE_SIDE_BAR, value: value });
};

const toggleNotificationDrawer = (value) => {
  store.dispatch({ type: TOGGLE_NOTIFICATION_DRAWER, value: value });
};

const selectDrawerMenu = (menu) => {
  store.dispatch({ type: SELECT_DRAWER_MENU, value: menu });
};

const setSearchVisibility = (show) => {
  store.dispatch({
    type: SET_SEARCH_VISIBILITY,
    show: show,
  });
};

const setSearchPlaceholder = (placeholder) => {
  store.dispatch({
    type: SET_SEARCH_PLACEHOLDER,
    placeholder: placeholder,
  });
};

const setSearchRef = (inputRef) => {
  store.dispatch({
    type: SET_SEARCH_INPUT_REF,
    inputRef: inputRef,
  });
};

const loading = (show, message) => {
  store.dispatch({
    type: SHOW_LOADING_DIALOG,
    show: show,
    message: message,
  });
};

const AppActions = {
  toggleMobileMenu,
  toggleDarkMode,
  toggleSideBar,
  toggleNotificationDrawer,
  selectDrawerMenu,
  setSearchVisibility,
  setSearchPlaceholder,
  setSearchRef,
  loading,
};

export default AppActions;
