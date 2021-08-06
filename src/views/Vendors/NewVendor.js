import React from "react";
import ReactForm from "core/ReactForm";

import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { newVendorAPI } from "api/vendor/vendor";
import { useHistory } from "react-router-dom";

import ReactGA from "react-ga";
import VendorActions from "store/actions/vendor_actions";
import { checkUsernameAPI } from "api/user/availability";

const NewVendor = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const userToken = useSelector((state) => state.user.token);

  const data = [
    {
      type: "textfield",
      label: "Username",
      name: "username",
      validator: async (value) => {
        const checkUsername = await checkUsernameAPI(value);

        if (checkUsername.error) {
          return {
            error: true,
            helperText: checkUsername.error.message,
          };
        }
        return {
          error: false,
          helperText: "Username is available",
        };
      },
    },
    {
      type: "password",
      label: "Password",
      name: "password",
    },
    {
      type: "textfield",
      label: "Name",
      name: "name",
    },
    {
      type: "textfield",
      label: "Email",
      name: "email",
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
    },
    {
      type: "textfield",
      label: "Address",
      caption: "Complete address including city, state and zip",
      name: "address",
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
          description: "Pay Flat fee when property is completed",
        },
        {
          label: "Pay a percentage",
          value: "pay_a_percentage",
          description:
            "Pay a percentage of property price when property is completed",
        },
        {
          label: "Pay when close",
          value: "pay_when_close",
          description: "Pay Flat fee when property is closed",
        },
        {
          label: "Flat fee",
          value: "flat_fee",
          description: "Pay Flat fee whenever user created a new property",
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
      label: "Create New Vendor",
    },
  ];

  const handleOnSubmit = async (values) => {
    values.token = userToken;

    const response = await newVendorAPI(values);
    if (!response.error) {
      // Send GA events
      ReactGA.event({
        category: "User",
        action: "Vendor Created",
      });

      VendorActions.addNewVendor(response);
      enqueueSnackbar("New Vendor created successfully", {
        variant: "success",
      });
      history.replace("/vendors");
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  return <ReactForm data={data} onSubmit={handleOnSubmit} />;
};

export default NewVendor;
