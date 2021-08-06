import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import changeExpirationDateAPI from "api/admin/change-expiration-date";
import DatePicker from "core/ReactForm/components/DatePicker";
import DateFormat from "core/utils/DateFormat";

const ExpirationDateDialog = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [expirationDate, setExpirationDate] = React.useState(null);

  const userToken = useSelector((state) => state.user.token);

  const changeExpirationDate = async () => {
    const response = await changeExpirationDateAPI(
      userToken,
      expirationDate,
      props.user.id
    );
    if (!response.error) {
      enqueueSnackbar("Expiration date successfully changed", {
        variant: "success",
      });
      props.onClose();
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Set Expiration Date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Expanding expiration date for Active user will not stop PayPal
            subscription plan to stop recurring payments. But if user is
            expire(i.e CC expire or cancel the subscription plan) you can expand
            their expiration date so user can use BDT until this date without
            paying any thing. Free Users also remove by setting the expiration
            date once you set date for them they can use BDT until this date
            after this they have to subscribe otherwise they will not able to
            use BDT anymore.
          </DialogContentText>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1">Status</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography>{props.user.status}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Expire on</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              {props.user.account ? (
                <Typography>
                  <DateFormat date={props.user.account.expire_in} />
                </Typography>
              ) : (
                "Not specify"
              )}
            </Grid>
          </Grid>
          <Divider />
          <DatePicker
            value={expirationDate}
            onChange={(name, date) => setExpirationDate(date)}
            input={{ label: "Expiration Date", name: "expiration_date" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={changeExpirationDate} color="primary">
            Set Date
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ExpirationDateDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

ExpirationDateDialog.defaultProps = {
  open: false,
};

export default ExpirationDateDialog;
