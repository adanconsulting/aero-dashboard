import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
} from "@material-ui/core";
import ReactForm from "core/ReactForm";

import { useSelector } from "react-redux";
import { mapFormValues } from "core/ReactForm/components/utils";
import { useSnackbar } from "notistack";
import { createSelector } from "reselect";
import AdminActions from "store/actions/admin_actions";
import AppActions from "store/actions/app_actions";
import {
  sendAdminNotificationAPI,
  getAlertNotificationsAPI,
} from "api/admin/admin-notifications";
import NotificationItem from "./components/NotificationItem";

const useStyles = makeStyles(() => ({
  item: {
    display: "flex",
    flexDirection: "column",
  },
  notificationList: {
    marginTop: 16,
  },
}));

const loadNotifications = createSelector(
  (state) => state.admin,
  (admin) => admin.notifications
);

const Notifications = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const notifications = useSelector(loadNotifications);
  const userToken = useSelector((state) => state.user.token);

  const loadAdminNotifications = async () => {
    if (!notifications) {
      AppActions.loading(true, "Loading previous admin notifications...");
      const response = await getAlertNotificationsAPI(userToken);
      if (!response.error) {
        AdminActions.loadNotifications(response.notifications);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
      AppActions.loading(false, null);
    }
  };

  useEffect(() => {
    loadAdminNotifications();
  }, []);

  const handleFormSubmit = async (data) => {
    const response = await sendAdminNotificationAPI(
      userToken,
      data.title,
      data.message,
      data.priority
    );
    if (!response.error) {
      setFormData((oldData) =>
        mapFormValues(oldData, {
          title: "",
          message: "",
          priority: "blue",
        })
      );
      enqueueSnackbar("Admin notification send successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  const [formData, setFormData] = useState([
    {
      type: "textfield",
      name: "title",
      label: "Title",
    },
    {
      type: "textarea",
      name: "message",
      label: "Your Message",
    },
    {
      type: "select",
      name: "priority",
      label: "Notification Type",
      value: "blue",
      options: [
        {
          value: "blue",
          label: "Blue (Show in notification panel)",
        },
        {
          value: "red",
          label: "Red (Show Alert notification)",
        },
      ],
    },
    {
      type: "submit",
      label: "Send Notification",
    },
  ]);

  const useThisNotification = (notification) => {
    setFormData((oldData) =>
      mapFormValues(oldData, {
        title: notification.title,
        message: notification.message,
        priority: notification.priority,
      })
    );

    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Card>
        <CardHeader
          subheader="Inform all users about something"
          title="Send Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item xs={12}>
              <ReactForm data={formData} onSubmit={handleFormSubmit} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className={classes.notificationList}>
        <CardHeader
          title="Admin Notifications"
          subheader="Previously used notifications list"
        />
        <Divider />
        <CardContent>
          {notifications &&
            notifications.map((notification) => (
              <NotificationItem
                notification={notification}
                onUse={useThisNotification}
              />
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
