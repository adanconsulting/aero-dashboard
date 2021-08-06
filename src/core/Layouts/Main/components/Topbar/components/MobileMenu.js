import React from "react";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserActions from "store/actions/user_actions";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import AppActions from "store/actions/app_actions";

const MobileMenu = (props) => {
  const history = useHistory();
  const isOpen = useSelector((state) => state.app.topbar.toggleMobileMenu);
  const evt = useSelector((state) => state.app.topbar.mobileMenuEvt);

  const handleLogout = () => {
    UserActions.logout();
    history.push("/sign-in");
  };

  return (
    <Menu
      anchorEl={evt}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      open={isOpen}
      onClose={AppActions.toggleMobileMenu}
    >
      <MenuItem onClick={AppActions.toggleDarkMode}>
        <IconButton aria-label="toggle dark mode" color="inherit">
          <InvertColorsIcon />
        </IconButton>
        <p>Toggle dark mode</p>
      </MenuItem>
      <MenuItem onClick={AppActions.toggleNotificationDrawer}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge
            badgeContent={!props.isNotificationRead && "!"}
            {...(!props.isNotificationRead && { color: "secondary" })}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => history.push("/settings")}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="logout current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
};

MobileMenu.propTypes = {
  isNotificationRead: PropTypes.bool.isRequired,
};

export default MobileMenu;
