import API from "../areoland";

const mapAPI = async (token) => {
  try {
    const result = await API.post("/maps", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (mapAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default mapAPI;
