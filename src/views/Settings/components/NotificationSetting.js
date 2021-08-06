import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import Switches from "core/Components/Switches/Switch";

import { useSelector } from "react-redux";
import { updateUserAPI } from "api/user/user";
import { useSnackbar } from "notistack";

import UserActions from "store/actions/user_actions";
import LoadingButton from "core/Components/LoadingButton";
import { UserTypes } from "constant/Enums";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const NotificationSetting = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const userData = useSelector((state) => state.user);

  const [formData, setFormData] = useState(userData.notifications || {});

  const handleChange = (name, value) => {
    setFormData((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleNotificationSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      notifications: formData,
    };

    const response = await updateUserAPI(
      userData.token,
      userData.user_id,
      data
    );
    if (!response.error) {
      UserActions.updateUser(response);
      enqueueSnackbar("Notifications setting updated", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }

    setLoading(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleNotificationSubmit}>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item xs={12}>
              <FormControlLabel
                control={
                  <Switches
                    checked={formData.on_property_creation}
                    onChange={(v) => handleChange("on_property_creation", v)}
                  />
                }
                label="Notify me when new property is created"
              />
              {userData.type !== UserTypes.VENDOR ? (
                <FormControlLabel
                  control={
                    <Switches
                      checked={formData.on_vendor_property_creation}
                      onChange={(v) =>
                        handleChange("on_vendor_property_creation", v)
                      }
                    />
                  }
                  label="Notify when my vendor create property"
                />
              ) : null}
              {/* <FormControlLabel
                control={
                  <Switches
                    checked={formData.mobile_notification}
                    onChange={(v) => handleChange("mobile_notification", v)}
                  />
                }
                label="Send me mobile notification also"
              /> */}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <LoadingButton
            circleStyle={{ left: "20%" }}
            loading={loading}
            title="Update"
            type="submit"
          />
        </CardActions>
      </form>
    </Card>
  );
};

NotificationSetting.propTypes = {
  className: PropTypes.string,
};

export default NotificationSetting;
