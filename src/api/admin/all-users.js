import API from "../areoland";

const allUserAPI = async (token) => {
  try {
    const result = await API.post("/admin/all-users", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (allUserAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default allUserAPI;
