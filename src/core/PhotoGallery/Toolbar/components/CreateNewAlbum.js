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
import { useHistory } from "react-router-dom";

const CreateNewAlbum = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const collectionName = React.useRef();

  const createNewCollection = () => {
    if (collectionName.current) {
      history.push({
        pathname: `/property/files-photos/new-photos/${props.propertyId}`,
        state: {
          newCollection: true,
          collectionName: collectionName.current,
        },
      });
    } else {
      enqueueSnackbar("Enter collection name", { variant: "error" });
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of collection and upload at least one photo, you
            can't create empty collection.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="collection"
            label="Collection name"
            type="text"
            fullWidth
            onChange={(e) => (collectionName.current = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createNewCollection} color="primary">
            New Collection
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateNewAlbum.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

CreateNewAlbum.defaultPtops = {
  open: false,
};

export default CreateNewAlbum;
