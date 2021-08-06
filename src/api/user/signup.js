import API from "../areoland";

const signupAPI = async (userData) => {
  try {
    const result = await API.post("/user/signup", userData);
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (signupAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default signupAPI;
