import API from "../areoland";

export const loadAllVendorsAPI = async (token) => {
  try {
    const result = await API.post("/vendor/all", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (loadAllVendorsAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getSingleVendorAPI = async (vendorId) => {
  try {
    const result = await API.get(`/vendor/${vendorId}`);
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (getSingleVendorAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const newVendorAPI = async (vendorData) => {
  try {
    const result = await API.post("/vendor", vendorData);
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (newVendorAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const deleteVendorsAPI = async (token, vendorIds) => {
  try {
    const result = await API.post("/vendor/delete", {
      token: token,
      vendorIds: vendorIds,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (deleteVendorsAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
