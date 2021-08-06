import API from "../areoland";

const adminLoginAPI = async (token, loginTo) => {
  try {
    const result = await API.post("/user/admin-login", { token, loginTo });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (adminLoginAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default adminLoginAPI;
