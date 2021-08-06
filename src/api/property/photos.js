import API from "../areoland";

export const photosAPI = async (propertyId) => {
  try {
    const result = await API.get(`/property/photos/${propertyId}`);
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (photosAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const deletePhotosAPI = async (propertyId, albumId, token, ids) => {
  try {
    const result = await API.post("/storage/delete-photos", {
      propertyId,
      albumId,
      token,
      ids,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (deletePhotosAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
