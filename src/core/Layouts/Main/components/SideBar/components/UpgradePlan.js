import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import { PayPalButton } from "react-paypal-button-v2";
import { upgradeUserAPI } from "api/user/user";

import UserActions from "store/actions/user_actions";
import { paypalClientId, paypalPlanId } from "config";

const getUser = createSelector(
  (state) => state.user,
  (user) => user
);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.grey,
    margin: theme.spacing(2),
    whiteSpace: "break-spaces",
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: "center",
    "& > img": {
      height: "100%",
      width: "auto",
    },
  },
  content: {
    padding: theme.spacing(1, 2),
    textAlign: "center",
  },
  actions: {
    padding: theme.spacing(1, 2),
    display: "flex",
    justifyContent: "center",
  },
}));

const UpgradePlan = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(getUser);

  if (user.account.type !== "trial") {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.media}>
        <img alt="Upgrade to PRO" src="/upgrade-account.svg" />
      </div>
      <div className={classes.content}>
        <Typography gutterBottom variant="subtitle1">
          Upgrade to PRO
        </Typography>
        <Typography variant="caption">
          Your account will be expire in{" "}
          <b>{user.account.expire_after_days} days </b>
          Upgrade account using PayPal in just $19.97/month
        </Typography>
      </div>
      <div className={classes.actions}>
        <PayPalButton
          options={{
            vault: true,
            clientId: paypalClientId,
          }}
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              custom_id: user.id,
              plan_id: paypalPlanId,
            });
          }}
          onApprove={(data, actions) => {
            return actions.subscription.get().then(async (details) => {
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
              } else {
                enqueueSnackbar(response.error.message, { variant: "error" });
                enqueueSnackbar(
                  `Save order and subscription id and contact with support
                orderId: ${data.orderID} 
                subscriptionId: ${data.subscriptionID}`,
                  { variant: "warning" }
                );
              }

              return;
            });
          }}
        />
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string,
};

export default UpgradePlan;
