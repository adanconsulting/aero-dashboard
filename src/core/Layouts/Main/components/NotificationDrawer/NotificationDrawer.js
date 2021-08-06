import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import AppActions from "../../../../../store/actions/app_actions";
import NotificationItem from "./components/NotificationItem";
import NoNotificationFound from "core/Skeleton/NoNotificationFound";

import { getNotificationAPI } from "api/dashboard/notifications";
import NotificationActions from "store/actions/notification_actions";
import AlertNotification from "./components/AlertNotification";

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});

const getAllNotifications = createSelector(
  (state) => state.notification,
  (notification) => notification
);

const getUserToken = createSelector(
  (state) => state.user,
  (user) => user.token
);

export default function Notification() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isOpen = useSelector((state) => state.app.drawer.notification);
  const notification = useSelector(getAllNotifications);
  const userToken = useSelector(getUserToken);
  const [alertDialog, openAlertDialog] = useState(false);

  const loadNotifications = async () => {
    if (!notification.messages.length) {
      const response = await getNotificationAPI(userToken);
      if (!response.error) {
        NotificationActions.loadNotification(response);
        if (
          response.admin_notifications &&
          response.admin_notifications.alert
        ) {
          openAlertDialog(true);
        }
      } else {
        enqueueSnackbar("Notification error: " + response.error.message, {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const renderAdminNotifications = () => {
    if (notification.admin_notifications) {
      if (notification.admin_notifications.messages.length) {
        return notification.admin_notifications.messages.map((message) => (
          <NotificationItem key={message.id} notification={message} />
        ));
      }
    }
  };

  const renderNotifications = () => {
    if (notification.admin_notifications) {
      if (
        !notification.messages.length &&
        !notification.admin_notifications.messages.length
      ) {
        return <NoNotificationFound />;
      }
    } else if (!notification.messages.length) {
      return <NoNotificationFound />;
    }

    return notification.messages.map((message) => (
      <NotificationItem key={message.id} notification={message} />
    ));
  };

  const renderAlertNotification = () => {
    if (
      notification.admin_notifications &&
      notification.admin_notifications.alert
    ) {
      return (
        <AlertNotification
          open={alertDialog}
          onClose={() => openAlertDialog(false)}
          notification={notification.admin_notifications.alert}
          userToken={userToken}
          readDate={notification.admin_notifications.lastNotificationDate}
        />
      );
    }
  };

  if (notification.loading) {
    return (
      <div>
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={AppActions.toggleNotificationDrawer}
        >
          <Toolbar />
          <div className={classes.list} role="presentation">
            <List>Loading...</List>
          </div>
        </Drawer>
      </div>
    );
  }

  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={AppActions.toggleNotificationDrawer}
      >
        <Toolbar />
        <div className={classes.list} role="presentation">
          <List>
            {renderAdminNotifications()}
            {renderNotifications()}
          </List>
        </div>
      </Drawer>

      {renderAlertNotification()}
    </div>
  );
}
