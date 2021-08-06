import { loadAllPropertiesAPI } from "api/property/property";
import PropertyActions from "store/actions/property_actions";

const updatePropertyDashboard = async (token) => {
  const response = await loadAllPropertiesAPI(token);
  if (!response.error) {
    PropertyActions.loadAllProperties(response);
  } else {
    console.log("unable to update property dashboard");
    console.log(response);
  }
};

export default updatePropertyDashboard;
