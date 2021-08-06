import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserActions from "store/actions/user_actions";

import { useHistory } from "react-router-dom";

import AppActions from "store/actions/app_actions";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const TopBarMenuItems = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    UserActions.logout();
    history.push("/sign-in");
  };

  return (
    <>
      <div className={classes.sectionDesktop}>
        <Tooltip title="Toggle dark mode">
          <IconButton
            aria-label="toggle dark mode"
            color="inherit"
            onClick={AppActions.toggleDarkMode}
          >
            <InvertColorsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton
            aria-label="new notifications"
            color="inherit"
            onClick={AppActions.toggleNotificationDrawer}
          >
            <Badge
              badgeContent={!props.isNotificationRead && "!"}
              {...(!props.isNotificationRead && { color: "secondary" })}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Account">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={() => history.push("/settings")}
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton
            edge="end"
            aria-label="logout current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          onClick={AppActions.toggleMobileMenu}
        >
          <MoreIcon />
        </IconButton>
      </div>
    </>
  );
};

TopBarMenuItems.propTypes = {
  isNotificationRead: PropTypes.bool.isRequired,
};

export default TopBarMenuItems;
