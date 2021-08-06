import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactTable from "core/ReactTable";
import PaymentIcon from "@material-ui/icons/Payment";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { paymentDetailAPI, earningDetailAPI } from "api/payment/vendor-payment";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import DateFormat from "core/utils/DateFormat";
import { formatMoney } from "core/utils/format_util";
import EarningDetail from "./components/EarningDetail";
import AppActions from "store/actions/app_actions";
import VendorActions from "store/actions/vendor_actions";
import { paidDetailAPI } from "api/payment/vendor-payment";
import PaidDetail from "./components/PaidDetail";

const useStyles = makeStyles({
  clickableCell: {
    textDecoration: "underline",
    cursor: "pointer",
    color: "blue",
  },
});

const VendorPayment = () => {
  const history = useHistory();
  const classes = useStyles();
  const userToken = useSelector((state) => state.user.token);
  const payments = useSelector((state) => state.vendor.payments);
  const [earningDetail, setEarningDetail] = useState();
  const [paidDetail, setPaidDetail] = useState();
  const vendorEarnings = useRef([]);
  const paidHistory = useRef([]);
  const [loading, setLoading] = useState(!Boolean(payments.length));

  const { enqueueSnackbar } = useSnackbar();

  const loadPaymentDetail = async () => {
    if (!payments.length) {
      const response = await paymentDetailAPI(userToken);
      setLoading(false);
      if (!response.error) {
        VendorActions.loadVendorPayments(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadPaymentDetail();
  }, []);

  const showVendorEarning = async (vendorId) => {
    const earnings = vendorEarnings.current;
    if (earnings[vendorId]) {
      setEarningDetail(earnings[vendorId]);
    } else {
      AppActions.loading(true, "Fetching vendor earning detail...");
      const response = await earningDetailAPI(userToken, vendorId);
      if (!response.error) {
        earnings[vendorId] = response;
        setEarningDetail(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
      AppActions.loading(false, null);
    }
  };

  const showPaidHistory = async (vendorId) => {
    const paymentHistory = paidHistory.current;
    if (paymentHistory[vendorId]) {
      setPaidDetail(paymentHistory[vendorId]);
    } else {
      AppActions.loading(true, "Fetching vendor paid history...");
      const response = await paidDetailAPI(userToken, vendorId);
      if (!response.error) {
        paymentHistory[vendorId] = response;
        setPaidDetail(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
      AppActions.loading(false, null);
    }
  };

  if (loading) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <>
      <ReactTable
        title="Vendor Payments"
        options={{
          selection: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            tooltip: "Pay Now",
            icon: PaymentIcon,
            position: "row",
            onClick: (evt, data) => {
              history.push(`/vendor/pay/${data.vendor_id}`);
            },
          },
        ]}
        columns={[
          { title: "Name", field: "name" },
          { title: "Username", field: "username" },
          {
            title: "Earn",
            field: "earn",
            render: (rowData) => (
              <span
                className={classes.clickableCell}
                onClick={() => showVendorEarning(rowData.vendor_id)}
              >
                ${formatMoney(rowData.earn)}
              </span>
            ),
          },
          {
            title: "Paid",
            field: "paid",
            render: (rowData) => (
              <span
                className={classes.clickableCell}
                onClick={() => showPaidHistory(rowData.vendor_id)}
              >
                ${formatMoney(rowData.paid)}
              </span>
            ),
          },
          {
            title: "Payable",
            field: "payable",
            render: (rowData) => <span>${formatMoney(rowData.payable)}</span>,
          },
          {
            title: "Last Payment",
            field: "last_payment",
            render: (rowData) => <DateFormat date={rowData.last_payment} />,
          },
        ]}
        data={payments}
      />

      {earningDetail && <EarningDetail data={earningDetail} />}
      {paidDetail && <PaidDetail data={paidDetail} />}
    </>
  );
};

export default VendorPayment;
