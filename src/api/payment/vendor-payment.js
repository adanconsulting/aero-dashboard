import API from "../areoland";

export const paymentDetailAPI = async (token) => {
  try {
    const result = await API.post("/vendor/payment/detail", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (paymentDetailAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const earningDetailAPI = async (token, vendorId) => {
  try {
    const result = await API.post("/vendor/payment/earning", {
      token,
      vendorId,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (earningDetailAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const paidDetailAPI = async (token, vendorId) => {
  try {
    const result = await API.post("/vendor/payment/paid", {
      token,
      vendorId,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (paidDetailAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const addPaymentAPI = async (token, vendorId, paidOn, amount, note) => {
  try {
    const result = await API.post("/vendor/payment/add", {
      token,
      vendorId,
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
