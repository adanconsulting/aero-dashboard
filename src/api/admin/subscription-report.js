import API from "../areoland";

const subscriptionReportAPI = async (token, userId) => {
  try {
    const result = await API.post("/admin/subscription-report", {
      token: token,
      user_id: userId,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (subscriptionReportAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default subscriptionReportAPI;
