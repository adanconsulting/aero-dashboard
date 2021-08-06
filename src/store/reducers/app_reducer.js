export const TOGGLE_MOBILE_MENU = "APP_TOGGLE_MOBILE_MENU";
export const TOGGLE_DARK_MODE = "APP_TOGGLE_DARK_MODE";
export const TOGGLE_SIDE_BAR = "APP_TOGGLE_SIDE_BAR";
export const TOGGLE_NOTIFICATION_DRAWER = "APP_TOGGLE_NOTIFICATION_DRAWER";
export const SELECT_DRAWER_MENU = "APP_SELECT_DRAWER_MENU";
export const SET_SEARCH_PLACEHOLDER = "APP_SET_SEARCH_PLACEHOLDER";
export const SET_SEARCH_INPUT_REF = "APP_SET_SEARCH_INPUT_REF";
export const SET_SEARCH_VISIBILITY = "APP_SET_SEARCH_VISIBILITY";
export const SHOW_LOADING_DIALOG = "APP_SHOW_LOADING_DIALOG";

const initialState = {
  search: {
    placeholder: "Not available...",
    inputRef: null,
    show: false,
  },
  topbar: {
    toggleMobileMenu: false,
    mobileMenuEvt: null,
  },
  drawer: {
    sidebar: false,
    notification: false,
    selectedMenu: null,
  },
  theme: {
    darkmode: false,
  },
  loading: {
    show: false,
    message: "",
  },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        topbar: {
          ...state.topbar,
          toggleMobileMenu: !state.topbar.toggleMobileMenu,
          mobileMenuEvt: action.evt,
        },
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        theme: {
          ...state.theme,
          darkmode: !state.theme.darkmode,
        },
      };
    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          sidebar: action.value,
        },
      };
    case TOGGLE_NOTIFICATION_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          notification: !state.drawer.notification,
        },
      };
    case SELECT_DRAWER_MENU:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          selectedMenu: action.value,
        },
      };
    case SET_SEARCH_VISIBILITY:
      return {
        ...state,
        search: {
          ...state.search,
          show: action.show,
        },
      };
    case SET_SEARCH_PLACEHOLDER:
      return {
        ...state,
        search: {
          ...state.search,
          placeholder: action.placeholder,
        },
      };
    case SET_SEARCH_INPUT_REF:
      return {
        ...state,
        search: {
          ...state.search,
          inputRef: action.inputRef,
        },
      };
    case SHOW_LOADING_DIALOG:
      return {
        ...state,
        loading: {
          show: action.show,
          message: action.message,
        },
      };
    default:
      return state;
  }
};

export default AppReducer;
