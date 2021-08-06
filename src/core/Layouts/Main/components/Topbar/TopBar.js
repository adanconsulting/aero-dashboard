import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";

import Search from "./components/Search";
import TopBarMenuItems from "./components/TopBarMenuItems";
import MobileMenu from "./components/MobileMenu";
import { drawerWidth } from "../../../../../constant/Constants";
import AppActions from "../../../../../store/actions/app_actions";

import { useHistory } from "react-router-dom";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { readNotificationAPI } from "api/dashboard/notifications";

import NotificationActions from "store/actions/notification_actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarHighIndex: {
    zIndex: 1301,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));

const getNotifications = createSelector(
  (state) => state.notification,
  (notification) => notification
);

const getUserToken = createSelector(
  (state) => state.user,
  (user) => user.token
);

const TopBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const isDarkMode = useSelector((state) => state.app.theme.darkmode);
  const isSideBarOpen = useSelector((state) => state.app.drawer.sidebar);
  const isNotificationDrawerOpen = useSelector(
    (state) => state.app.drawer.notification
  );
  const userNotifications = useSelector(getNotifications);
  const userToken = useSelector(getUserToken);

  const markNotificationAsRead = async () => {
    if (!userNotifications.readAll) {
      let readDate;
      if (userNotifications.admin_notifications) {
        readDate = userNotifications.admin_notifications.lastNotificationDate;
      }
      const response = await readNotificationAPI(userToken, readDate);
      if (!response.error) {
        NotificationActions.readNotifications();
      }
    } else if (userNotifications.admin_notifications) {
      const notificationResponse = await readNotificationAPI(
        userToken,
        userNotifications.admin_notifications.lastNotificationDate
      );
      if (notificationResponse.error) {
        console.log(notificationResponse.error.message);
      }
    }
  };

  useEffect(() => {
    if (isNotificationDrawerOpen) {
      markNotificationAsRead();
    }
  }, [isNotificationDrawerOpen]);

  return (
    <div>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isSideBarOpen,
          [classes.appBarHighIndex]: isNotificationDrawerOpen,
        })}
        position="fixed"
        color={isDarkMode ? "inherit" : "primary"}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isSideBarOpen,
            })}
            color="inherit"
            aria-label="open drawer"
            onClick={() => AppActions.toggleSideBar(true)}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => history.push("/")}
          >
            <Avatar alt="AreoLand Logo" src="/logo.png" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {props.title}
          </Typography>
          <Search />
          <TopBarMenuItems isNotificationRead={userNotifications.readAll} />
        </Toolbar>
      </AppBar>

      <MobileMenu isNotificationRead={userNotifications.readAll} />
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string,
};

export default TopBar;
