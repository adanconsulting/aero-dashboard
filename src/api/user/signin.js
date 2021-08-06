import API from "../areoland";

const signinAPI = async (username, password) => {
  try {
    const result = await API.post("/user/login", {
      username: username,
      password: password,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (signinAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default signinAPI;
