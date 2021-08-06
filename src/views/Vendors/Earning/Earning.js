import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { earningDetailAPI } from "api/payment/vendor-payment";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import VendorActions from "store/actions/vendor_actions";
import { paidDetailAPI } from "api/payment/vendor-payment";
import EarningDetail from "../Payment/components/EarningDetail";
import PaidDetail from "../Payment/components/PaidDetail";
import { formatMoney } from "core/utils/format_util";

const VendorEarning = () => {
  const user = useSelector((state) => state.user);
  const earning = useSelector((state) => state.vendor.earning);

  const { enqueueSnackbar } = useSnackbar();

  const loadVendorEarning = async () => {
    if (earning === undefined) {
      const earn = await getVendorEarning();
      const paid = await getPaidHistory();

      if (earn && paid) {
        const totalEarn = earn.reduce((r, item) => {
          return r + item.payment;
        }, 0);

        const totalPaid = paid.reduce((r, item) => {
          return r + item.amount;
        }, 0);

        const totalPending = totalEarn - totalPaid;

        VendorActions.loadVendorEarning(
          earn,
          paid,
          totalEarn,
          totalPaid,
          totalPending
        );
      }
    }
  };

  const getVendorEarning = async () => {
    const response = await earningDetailAPI(user.token, user.user_id);
    if (!response.error) {
      return response;
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
      return false;
    }
  };

  const getPaidHistory = async () => {
    const response = await paidDetailAPI(user.token, user.user_id);
    if (!response.error) {
      return response;
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
      return false;
    }
  };

  useEffect(() => {
    loadVendorEarning();
  }, []);

  if (earning === undefined) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <>
      <Grid
        container
        spacing={3}
        style={{ backgroundColor: "#f5fbfe", padding: 16 }}
      >
        <Grid item xs={4}>
          <Typography>
            <strong>Total Earn:</strong> ${formatMoney(earning.total.earn)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Total Paid:</strong> ${formatMoney(earning.total.paid)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Pending:</strong> ${formatMoney(earning.total.pending)}
          </Typography>
        </Grid>
      </Grid>
      <EarningDetail data={earning.earn} />
      <PaidDetail data={earning.paid} />
    </>
  );
};

export default VendorEarning;
