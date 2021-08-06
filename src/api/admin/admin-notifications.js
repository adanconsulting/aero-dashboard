import API from "../areoland";

export const sendAdminNotificationAPI = async (
  token,
  title,
  message,
  priority
) => {
  try {
    const result = await API.post("/admin/send-notification", {
      token,
      title,
      message,
      priority,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (sendAdminNotificationAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getAlertNotificationsAPI = async (token) => {
  try {
    const result = await API.post("/admin/get-alert-notifications", {
      token,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (getAlertNotificationsAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
