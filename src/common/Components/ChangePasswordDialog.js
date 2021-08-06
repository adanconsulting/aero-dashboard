import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { updateUserAPI } from "api/user/user";

const ChangePasswordDialog = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const password = React.useRef();
  const confirmPassword = React.useRef();

  const userToken = useSelector((state) => state.user.token);

  const changeUserPassword = async () => {
    if (password.current !== confirmPassword.current) {
      enqueueSnackbar("Password does not match", { variant: "error" });
      return;
    }

    const response = await updateUserAPI(userToken, props.userId, {
      password: password.current,
    });
    if (!response.error) {
      enqueueSnackbar("User password updated", { variant: "success" });
      props.onClose();
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            After changing user password user will not able to login with old
            password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="text"
            fullWidth
            onChange={(e) => (password.current = e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="text"
            fullWidth
            onChange={(e) => (confirmPassword.current = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={changeUserPassword} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ChangePasswordDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

ChangePasswordDialog.defaultProps = {
  open: false,
};

export default ChangePasswordDialog;
