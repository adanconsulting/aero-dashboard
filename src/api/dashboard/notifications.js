import API from "../areoland";

export const getNotificationAPI = async (token) => {
  try {
    const result = await API.post("/notifications", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (getNotificationAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const readNotificationAPI = async (token, readDate = undefined) => {
  try {
    const result = await API.post("/notifications/read", {
      token: token,
      admin_notifications_read_date: readDate,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (readNotificationAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
