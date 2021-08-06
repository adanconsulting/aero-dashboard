import API from "../areoland";

const siteStatisticsAPI = async (token) => {
  try {
    const result = await API.post("/admin/site-statistics", {
      token: token,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (siteStatisticsAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default siteStatisticsAPI;
