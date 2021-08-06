import API from "../areoland";

const resetPasswordAPI = async (token, password) => {
  try {
    const result = await API.post("/user/reset-password", { token, password });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (resetPasswordAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default resetPasswordAPI;
