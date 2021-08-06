import API from "../areoland";

export const loadAllPropertiesAPI = async (token) => {
  try {
    const result = await API.post("/property/all", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (loadAllPropertiesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

// UserToken is comming from NewProperty.js
export const newPropertyAPI = async (propertyData) => {
  try {
    const result = await API.post("/property", propertyData);
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (newPropertyAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getSinglePropertyAPI = async (propertyId) => {
  try {
    const result = await API.get(`/property/${propertyId}`);
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (getSinglePropertyAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const updatePropertyAPI = async (token, propertyId, updatedData) => {
  try {
    const result = await API.put(`/property/${propertyId}`, {
      token: token,
      ...updatedData,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (updatePropertyAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const propertyCommunicationAPI = async (token, propertyId, message) => {
  try {
    const result = await API.post("/property/communication", {
      token,
      propertyId,
      message,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (propertyCommunicationAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const deletePropertiesAPI = async (token, propertyIds) => {
  try {
    const result = await API.post("/property/delete", {
      token: token,
      propertyIds: propertyIds,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (deletePropertiesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const changePropertiesStatusAPI = async (token, propertyIds, status) => {
  try {
    const result = await API.post("/property/change-status", {
      token,
      propertyIds,
      status,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (changePropertiesStatusAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const addNewFollowUpTaskAPI = async (token, propertyId, date, note) => {
  try {
    const result = await API.post("/property/follow-up", {
      token,
      propertyId,
      date,
      note,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (addNewFollowUpTaskAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const changeFollowUpStatus = async (token, propertyId, taskObject) => {
  try {
    const result = await API.post("/property/follow-up-status", {
      token,
      propertyId,
      taskObject,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (changeFollowUpStatus)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
