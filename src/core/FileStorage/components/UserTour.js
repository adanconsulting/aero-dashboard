import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const UserTour = (props) => {
  const tourEnd = () => {
    localStorage.setItem("FILE_STORAGE_tour", false);
    props.onClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Instructions</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <strong>
              We recommend turning on allow multiple images and auto upload
            </strong>
            <h4>STEPS</h4>
            <ol>
              <li>click on select images</li>
              <li>pick the photos you want to upload</li>
              <li>
                if auto upload is on it will start immediately, if not on you
                must click on the Cloud with Arrow on each photo to upload that
                single photo
              </li>
              <li>
                A white circle with a check will appear if the photo is uploaded
                correctly
              </li>
            </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={tourEnd} color="primary">
            I Understand
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

UserTour.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

UserTour.defaultPtops = {
  open: false,
};

export default UserTour;
