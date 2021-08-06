import { not_in_array } from "core/utils/array_util";

export const LOAD_ALL_VENDORS = "VENDOR_LOAD_ALL_VENDORS";
export const LOAD_SINGLE_VENDOR = "VENDOR_LOAD_SINGLE_VENDOR";
export const DELETE_VENDORS = "VENDOR_DELETE_VENDORS";
export const ADD_NEW_VENDOR = "VENDOR_ADD_NEW_VENDOR";
export const UPDATE_VENDOR = "VENDOR_UPDATE_VENDOR";
export const LOAD_VENDOR_PAYMENTS = "VENDOR_LOAD_VENDOR_PAYMENTS";
export const UPDATE_VENDOR_PAYMENT = "VENDOR_UPDATE_VENDOR_PAYMENT";
export const LOAD_VENDOR_EARNING = "VENDOR_LOAD_VENDOR_EARNING";

const initialState = {
  all: [],
  single: {},
  payments: [],
};

const deleteVendors = (state, action) => {
  const newVendors = [];
  state.all.forEach((vendor) => {
    if (not_in_array(action.vendorIds, vendor.id)) {
      newVendors.push(vendor);
    }
  });

  return {
    ...state,
    all: newVendors,
  };
};

const updateVendorPayment = (state, action) => {
  const newState = Object.assign({}, state);

  const paymentIndex = newState.payments.findIndex(
    (p) => p.vendor_id === action.vendorId
  );
  if (paymentIndex !== -1) {
    newState.payments[paymentIndex] = {
      ...newState.payments[paymentIndex],
      paid: newState.payments[paymentIndex].paid + action.amount,
      payable: newState.payments[paymentIndex].payable - action.amount,
    };
  }

  return newState;
};

const VendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_VENDORS:
      return {
        ...state,
        all: action.data,
      };
    case LOAD_SINGLE_VENDOR:
      return {
        ...state,
        single: {
          ...state.single,
          [action.vendorId]: action.data,
        },
      };
    case ADD_NEW_VENDOR:
      return {
        ...state,
        all: [action.data, ...state.all],
      };
    case UPDATE_VENDOR:
      return {
        ...state,
        single: {
          ...state.single,
          [action.vendorId]: action.updatedData,
        },
      };
    case DELETE_VENDORS:
      return deleteVendors(state, action);
    case LOAD_VENDOR_PAYMENTS:
      return { ...state, payments: action.payments };
    case UPDATE_VENDOR_PAYMENT:
      return updateVendorPayment(state, action);
    case LOAD_VENDOR_EARNING:
      return {
        ...state,
        earning: action.earning,
      };
    default:
      return state;
  }
};

export default VendorReducer;
