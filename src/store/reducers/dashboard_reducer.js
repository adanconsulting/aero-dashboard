export const GET_DATA = "DASHBOARD_GET_DATA";
export const LOAD_DATA = "DASHBORD_LOAD_DATA";

const initialState = {};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state };
    case LOAD_DATA:
      return { ...action.data };
    default:
      return state;
  }
};

export default DashboardReducer;
