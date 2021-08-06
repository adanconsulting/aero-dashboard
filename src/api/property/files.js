import API from "../areoland";

export const filesAPI = async (propertyId) => {
  try {
    const result = await API.get(`/property/files/${propertyId}`);
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (filesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const deleteFilesAPI = async (propertyId, token, ids) => {
  try {
    const result = await API.post("/storage/delete-files", {
      propertyId,
      token,
      ids,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (deleteFilesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
