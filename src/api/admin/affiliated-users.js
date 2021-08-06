import API from "../areoland";

const affiliatedUserAPI = async (token, userId) => {
  try {
    const result = await API.post("/admin/affiliated-users", { token, userId });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (affiliatedUserAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default affiliatedUserAPI;
