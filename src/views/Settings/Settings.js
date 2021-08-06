import React from "react";
import { Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

import AccountSetting from "./components/AccountSetting";
import NotificationSetting from "./components/NotificationSetting";
import PasswordSetting from "./components/PasswordSetting";
import Affiliate from "./components/Affiliate";
import CancelAccount from "./components/CancelAccount";

const Settings = () => {
  const userType = useSelector((state) => state.user.type);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <AccountSetting />
        </Grid>
        <Grid item md={7} xs={12}>
          <NotificationSetting />
        </Grid>
        <Grid item md={5} xs={12}>
          <PasswordSetting />
        </Grid>
        <Grid item xs={12}>
          {(userType === "main" || userType === "admin") && <Affiliate />}
        </Grid>
        <Grid item xs={12}>
          {(userType === "main" || userType === "admin") && <CancelAccount />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
