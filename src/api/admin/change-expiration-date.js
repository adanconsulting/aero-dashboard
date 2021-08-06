import API from "../areoland";

const changeExpirationDateAPI = async (token, expireIn, userId) => {
  try {
    const result = await API.post("/admin/change-expiration-date", {
      token,
      expireIn,
      userId,
    });
    return result.data;
  } catch (e) {
    console.log(
      "FAILED: unable to perform API request (changeExpirationDateAPI)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export default changeExpirationDateAPI;
