import React, { useState, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import ReactForm from "core/ReactForm";
import { useSnackbar } from "notistack";

import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import PaymentDetailNotFound from "core/Skeleton/PaymentDetailNotFound";
import { formatMoney } from "core/utils/format_util";
import AlertDialog from "core/Components/AlertDialog";
import { addPaymentAPI } from "api/payment/vendor-payment";
import VendorActions from "store/actions/vendor_actions";

const findVendorPaymentDetail = createSelector(
  (state) => state.vendor,
  (_, vendorId) => vendorId,
  (vendor, vendorId) =>
    vendor.payments.find((user) => user.vendor_id === vendorId)
);

const Pay = (props) => {
  const vendorId = props.match.params.vendorId;
  const vendor = useSelector((state) =>
    findVendorPaymentDetail(state, vendorId)
  );
  const userToken = useSelector((state) => state.user.token);

  const { enqueueSnackbar } = useSnackbar();
  const formDataRef = useRef({});
  const [openAlert, setOpenAlert] = useState(false);

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
    formDataRef.current = {
      paidOn: data.paid_on,
      amount: data.amount,
      note: data.note,
    };

    if (data.amount > vendor.payable) {
      setOpenAlert(true);
    } else {
      addVendorPayment();
    }
  };

  const confirmPayment = () => {
    addVendorPayment();
  };

  const addVendorPayment = async () => {
    const d = formDataRef.current;
    const response = await addPaymentAPI(
      userToken,
      vendorId,
      d.paidOn,
      d.amount,
      d.note
    );
    if (!response.error) {
      enqueueSnackbar("Payment successfully added", { variant: "success" });
      VendorActions.updateVendorPayment(vendorId, d.amount);
      props.history.goBack();
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  if (!vendor) {
    return (
      <PaymentDetailNotFound
        message="Vendor information is not found, go back to 
    vendor payment detail page and from there click on 'Pay Now' button."
        goToBack="/vendor/payment"
      />
    );
  }

  return (
    <Card>
      <CardHeader
        title={`Pay to ${vendor.name}`}
        subheader={`This vendor earn $${formatMoney(vendor.earn)} and you paid 
        $${formatMoney(vendor.paid)}. Now payable amount left is 
        $${formatMoney(vendor.payable)}`}
      />
      <Divider />
      <CardContent>
        <ReactForm data={formData} onSubmit={handleFormSubmit} />
      </CardContent>

      <AlertDialog
        variant="error"
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Pay to the vendor"
        message="You are going to pay more than the payable amount.
                  Are you sure you want to pay this amount"
        okText="Pay"
        cancelText="cancel"
        onOk={confirmPayment}
      />
    </Card>
  );
};

export default Pay;
