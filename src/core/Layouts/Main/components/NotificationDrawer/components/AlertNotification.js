import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import readAdminNotificationAPI from "api/admin/read-admin-notifications";

const AlertNotification = (props) => {
  const closeAlertNotification = async () => {
    const response = await readAdminNotificationAPI(
      props.userToken,
      props.readDate
    );
    if (response.error) {
      console.log(response.error.message);
    }
    props.onClose();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.notification.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            {props.notification.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlertNotification} color="primary">
            I Understand
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertNotification.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  userToken: PropTypes.string.isRequired,
  readDate: PropTypes.string.isRequired,
};

AlertNotification.defaultPtops = {
  open: false,
};

export default AlertNotification;
