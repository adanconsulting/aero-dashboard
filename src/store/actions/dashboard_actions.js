import store from "../store";

import { GET_DATA, LOAD_DATA } from "../reducers/dashboard_reducer";

const getData = () => {
  store.dispatch({ type: GET_DATA });
};

const loadData = (data) => {
  store.dispatch({ type: LOAD_DATA, data: data });
};

const DashboardActions = {
  getData,
  loadData,
};

export default DashboardActions;
