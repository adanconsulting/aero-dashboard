import API from "../areoland";

const readAdminNotificationAPI = async (token, readDate) => {
  try {
    const result = await API.post("/notifications/read-admin-notifications", {
      token: token,
      admin_notifications_read_date: readDate,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (readAdminNotificationAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default readAdminNotificationAPI;
