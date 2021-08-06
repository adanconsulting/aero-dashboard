import API from "../areoland";

export const accountsToCancelAPI = async (token) => {
  try {
    const result = await API.post("/admin/accounts-to-cancel", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (accountsToCancelAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const cancelAccountAPI = async (token, userId) => {
  try {
    const result = await API.post("/admin/cancel-account", { token, userId });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (cancelAccountAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
