import API from "../areoland";

const forgetPasswordAPI = async (email) => {
  try {
    const result = await API.post("/user/forget", { email });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (forgetPasswordAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default forgetPasswordAPI;
