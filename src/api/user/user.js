import API from "../areoland";

export const allUserAPI = async (token) => {
  try {
    const result = await API.post("/admin/all-users", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (allUserAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const updateUserAPI = async (token, userId, updatedData) => {
  try {
    const result = await API.put(`/user/${userId}`, {
      token: token,
      ...updatedData,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (updateUserAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const upgradeUserAPI = async (token, orderId, subscriptionId) => {
  try {
    const result = await API.post("/user/upgrade", {
      token,
      orderId,
      subscriptionId,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (upgradeUserAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
