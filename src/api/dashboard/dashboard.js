import API from "../areoland";

const dashboardAPI = async (token) => {
  try {
    const result = await API.post("/dashboard", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (dashboardAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default dashboardAPI;
