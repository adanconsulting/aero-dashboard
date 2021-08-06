import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DateFormat from "core/utils/DateFormat";
import Divider from "@material-ui/core/Divider";

import { useHistory } from "react-router-dom";
import AppActions from "store/actions/app_actions";

const NotificationTypes = {
  PROPERTY_CREATION: "property_creation",
  VEDNOR_PROPERTY_CREATION: "vendor_property_creation",
  VENDOR_CREATION: "vendor_creation",
  ADMIN_NOTIFICATIONS: "admin_notifications",
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const NotificationItem = (props) => {
  const { notification } = props;
  const classes = useStyles();
  const history = useHistory();

  const goToProperty = (id) => {
    AppActions.toggleNotificationDrawer(false);
    history.push(`/property/information/${id}`);
  };
  const propertyCreation = (notification) => {
    return (
      <Card raised className={classes.root}>
        <CardActionArea onClick={() => goToProperty(notification.property_id)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {notification.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              New property
              <Box fontWeight="fontWeightBold" m={1} display="inline">
                {notification.property_address}
              </Box>
              has been created by
              <Box fontWeight="fontWeightBold" m={1} display="inline">
                {notification.user_name}
              </Box>
              on
              <Box fontStyle="oblique" m={1} display="inline">
                <DateFormat date={notification.property_created_on} />
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  const goToVendor = (id) => {
    AppActions.toggleNotificationDrawer(false);
    history.push(`/vendor/detail/${id}`);
  };
  const vendorCreation = (notification) => {
    return (
      <Card raised className={classes.root}>
        <CardActionArea onClick={() => goToVendor(notification.vendor_id)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {notification.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              New Vendor
              <Box fontWeight="fontWeightBold" m={1} display="inline">
                {notification.vendor_name}
              </Box>
              has been created by
              <Box fontWeight="fontWeightBold" m={1} display="inline">
                {notification.user_name}
              </Box>
              on
              <Box fontStyle="oblique" m={1} display="inline">
                <DateFormat date={notification.vendor_created_on} />
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  const adminNotifications = (notification) => {
    return (
      <Card
        raised
        className={classes.root}
        style={{ backgroundColor: "#f5fbfe" }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {notification.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              {notification.message}
              <Divider />
              Send on:{" "}
              <Box fontStyle="oblique" m={1} display="inline">
                <DateFormat date={notification.created_on} />
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  const defaultNotification = (notification) => {
    return (
      <Card raised className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              New Property
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              New property
              <Box fontWeight="fontWeightBold" m={1} display="inline">
                Address city state 123
              </Box>
              has been created by
              <Box fontWeight="fontWeightBold" m={1} display="inline">
                Azeem Haider
              </Box>
              on
              <Box fontStyle="oblique" m={1} display="inline">
                Sep 12 2003
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  switch (notification.type) {
    case NotificationTypes.PROPERTY_CREATION:
    case NotificationTypes.VEDNOR_PROPERTY_CREATION:
      return propertyCreation(notification);
    case NotificationTypes.VENDOR_CREATION:
      return vendorCreation(notification);
    case NotificationTypes.ADMIN_NOTIFICATIONS:
      return adminNotifications(notification);
    default:
      return defaultNotification(notification);
  }
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationItem;
