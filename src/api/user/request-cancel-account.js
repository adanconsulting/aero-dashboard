import API from "../areoland";

const requestCancelAccountAPI = async (token) => {
  try {
    const result = await API.post("/user/request-cancel-account", { token });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (requestCancelAccountAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default requestCancelAccountAPI;
