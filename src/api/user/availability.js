import API from "../areoland";

export const checkUsernameAPI = async (username) => {
  try {
    const result = await API.post("/available/username", {
      username: username,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (checkUsernameAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const checkEmailAPI = async (email) => {
  try {
    const result = await API.post("/available/email", {
      email: email,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (checkEmailAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const checkPhoneAPI = async (phone) => {
  try {
    const result = await API.post("/available/phone", {
      phone: phone,
    });

    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (checkPhoneAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
