import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { PayPalButton } from "react-paypal-button-v2";
import { upgradeUserAPI } from "api/user/user";

import UserActions from "store/actions/user_actions";
import { paypalClientId, paypalPlanId } from "config";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    background: "#ffffff",
  },
  content: {
    paddingTop: 150,
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const getUser = createSelector(
  (state) => state.user,
  (user) => user
);
const UpgradeAccount = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(getUser);
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">Upgrade your Account</Typography>
            <Typography variant="subtitle2" style={{ marginBottom: 16 }}>
              Upgrade account using PayPal in just <b>$19.97/month</b>
            </Typography>
            <PayPalButton
              options={{
                vault: true,
                clientId: paypalClientId,
              }}
              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id: paypalPlanId,
                });
              }}
              onApprove={async (data, actions) => {
                // const details = await actions.subscription.get();
                const response = await upgradeUserAPI(
                  user.token,
                  data.orderID,
                  data.subscriptionID
                );
                if (!response.error) {
                  UserActions.updateUser(response);
                  enqueueSnackbar("Account successfully upgrade", {
                    variant: "success",
                  });
                  history.replace("/");
                } else {
                  enqueueSnackbar(response.error.message, {
                    variant: "error",
                  });
                  enqueueSnackbar(
                    `Save order and subscription id and contact with support
                orderId: ${data.orderID} 
                subscriptionId: ${data.subscriptionID}`,
                    { variant: "warning" }
                  );
                }
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpgradeAccount;
