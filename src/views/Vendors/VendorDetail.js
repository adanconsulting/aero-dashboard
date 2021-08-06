import React, { useState, useEffect } from "react";
import ReactForm from "core/ReactForm";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import VendorActions from "store/actions/vendor_actions";
import { getSingleVendorAPI } from "api/vendor/vendor";
import PropertySkeleton from "core/Skeleton/PropertySkeleton";
import { mapFormValues } from "core/ReactForm/components/utils";
import { updateUserAPI } from "api/user/user";

const getSingleVendor = createSelector(
  (state) => state.vendor.single,
  (_, vendorId) => vendorId,
  (vendor, vendorId) => vendor[vendorId]
);

const VendorDetail = (props) => {
  const vendorId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState([
    {
      type: "textfield",
      label: "Username",
      name: "username",
      readOnly: true,
    },
    {
      type: "textfield",
      label: "Name",
      name: "name",
      value: "Azeem Haider",
    },
    {
      type: "textfield",
      label: "Email",
      name: "email",
      value: "azeem@gmail.com",
      schema: {
        email: {
          email: true,
        },
      },
    },
    {
      type: "phonenumber",
      label: "Phone",
      name: "phone",
      value: "+92 123 456789",
    },
    {
      type: "textfield",
      label: "Address",
      caption: "Complete address including city, state and zip",
      name: "address",
      value: "14 East Anthony Drive Champaign, Illinois 61820",
    },
    {
      type: "select",
      label: "Payment Type",
      caption: "How you want to pay this Vendor",
      name: "payment_type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "Pay per house",
          value: "pay_per_house",
        },
        {
          label: "Pay a percentage",
          value: "pay_a_percentage",
        },
        {
          label: "Pay when close",
          value: "pay_when_close",
        },
        {
          label: "Flat fee",
          value: "flat_fee",
        },
      ],
    },
    {
      type: "currency",
      name: "payment",
      label: "Payment",
      caption: "How much you want to pay",
    },
    {
      type: "submit",
      label: "Update Vendor Detail",
    },
  ]);

  const vendorData = useSelector((state) => getSingleVendor(state, vendorId));

  const loadSingleVendor = async () => {
    if (vendorData === undefined) {
      const response = await getSingleVendorAPI(vendorId);

      if (!response.error) {
        VendorActions.loadSingleVendor(vendorId, response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadSingleVendor();
  }, []);

  useEffect(() => {
    if (vendorData !== undefined) {
      setFormData((data) => mapFormValues(data, vendorData));
    }
  }, [vendorData]);

  const handleOnSubmit = async (values) => {
    const response = await updateUserAPI(token, vendorId, values);
    if (!response.error) {
      VendorActions.updateVendor(vendorId, response);
      enqueueSnackbar("User updated successfully", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  if (vendorData === undefined) {
    return <PropertySkeleton rows={10} />;
  }

  return <ReactForm data={formData} onSubmit={handleOnSubmit} />;
};

export default VendorDetail;
