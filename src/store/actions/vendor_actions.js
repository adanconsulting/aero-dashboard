import store from "../store";

import {
  LOAD_VENDOR_PAYMENTS,
  LOAD_ALL_VENDORS,
  LOAD_SINGLE_VENDOR,
  UPDATE_VENDOR_PAYMENT,
  DELETE_VENDORS,
  ADD_NEW_VENDOR,
  UPDATE_VENDOR,
  LOAD_VENDOR_EARNING,
} from "../reducers/vendor_reducer";

const loadAllVendors = (data) => {
  store.dispatch({
    type: LOAD_ALL_VENDORS,
    data: data,
  });
};

const loadSingleVendor = (vendorId, data) => {
  store.dispatch({
    type: LOAD_SINGLE_VENDOR,
    vendorId: vendorId,
    data: data,
  });
};

const addNewVendor = (data) => {
  store.dispatch({
    type: ADD_NEW_VENDOR,
    data: data,
  });
};

const updateVendor = (vendorId, updatedData) => {
  store.dispatch({
    type: UPDATE_VENDOR,
    vendorId: vendorId,
    updatedData: updatedData,
  });
};

const deleteVendors = (vendorIds) => {
  store.dispatch({
    type: DELETE_VENDORS,
    vendorIds: vendorIds,
  });
};

const loadVendorPayments = (payments) => {
  store.dispatch({
    type: LOAD_VENDOR_PAYMENTS,
    payments: payments,
  });
};

const loadVendorEarning = (earn, paid, totalEarn, totalPaid, totalPending) => {
  store.dispatch({
    type: LOAD_VENDOR_EARNING,
    earning: {
      earn,
      paid,
      total: {
        earn: totalEarn,
        paid: totalPaid,
        pending: totalPending,
      },
    },
  });
};

const updateVendorPayment = (vendorId, amount) => {
  store.dispatch({
    type: UPDATE_VENDOR_PAYMENT,
    vendorId: vendorId,
    amount: amount,
  });
};

const VendorActions = {
  loadAllVendors,
  loadSingleVendor,
  deleteVendors,
  addNewVendor,
  updateVendor,
  loadVendorPayments,
  loadVendorEarning,
  updateVendorPayment,
};

export default VendorActions;
