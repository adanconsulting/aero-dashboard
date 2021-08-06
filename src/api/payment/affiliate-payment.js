import API from "../areoland";

export const addPaymentAPI = async (token, userId, paidOn, amount, note) => {
  try {
    const result = await API.post("/admin/affiliate/add-payment", {
      token,
      userId,
      paidOn,
      amount,
      note,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (addPaymentAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
