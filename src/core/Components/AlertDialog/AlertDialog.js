import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = (props) => {
  let variantColor;

  switch (props.variant) {
    case "success":
      variantColor = "#edf7ed";
      break;
    case "info":
      variantColor = "#e8f4fd";
      break;
    case "error":
      variantColor = "#fdecea";
      break;
    case "warning":
      variantColor = "#fef4e5";
      break;
    default:
      variantColor = "#ffffff";
  }

  const handleCancel = () => {
    props.onClose();
    if (props.onCancel) props.cancel();
  };

  const handleOk = () => {
    props.onClose();
    if (props.onOk) props.ok();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>{props.title || "Alert"}</DialogTitle>
        <DialogContent style={{ backgroundColor: variantColor }}>
          <DialogContentText>{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            {props.cancelText || "Disagree"}
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            {props.okText || "Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.oneOf(["success", "error", "warning", "info"]),
};

export default AlertDialog;
