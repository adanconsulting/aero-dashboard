import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import ReactForm from "core/ReactForm";
import { useSnackbar } from "notistack";

import { useSelector } from "react-redux";
import { addPaymentAPI } from "api/payment/affiliate-payment";

const Pay = (props) => {
  const userId = props.match.params.userId;
  const userToken = useSelector((state) => state.user.token);

  const { enqueueSnackbar } = useSnackbar();

  const formData = [
    {
      type: "datepicker",
      name: "paid_on",
      label: "Paid on",
      value: null,
      schema: {
        paid_on: {
          presence: { allowEmpty: false },
        },
      },
    },
    {
      type: "currency",
      name: "amount",
      label: "Amount",
      schema: {
        amount: {
          presence: { allowEmpty: false, message: "is required" },
        },
      },
    },
    {
      type: "textarea",
      name: "note",
      label: "Note",
    },
    {
      type: "submit",
      label: "Pay Now",
    },
  ];

  const handleFormSubmit = async (data) => {
    const response = await addPaymentAPI(
      userToken,
      userId,
      data.paid_on,
      data.amount,
      data.note
    );
    if (!response.error) {
      enqueueSnackbar("Payment successfully added", { variant: "success" });
      props.history.goBack();
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  return (
    <Card>
      <CardHeader title="Pay to user" />
      <Divider />
      <CardContent>
        <ReactForm data={formData} onSubmit={handleFormSubmit} />
      </CardContent>
    </Card>
  );
};

export default Pay;
