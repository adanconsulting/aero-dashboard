import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.divider,
  },
  message: {
    width: "50%",
  },
  icon: {
    width: 200,
    height: 200,
  },
}));

const PaymentDetailNotFound = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const goToBack = () => {
    history.push(props.goToBack);
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <MoneyOffIcon className={classes.icon} />
      <Typography className={classes.message} variant="h5">
        {props.message}
      </Typography>
      <Button variant="contained" onClick={goToBack}>
        Go Back
      </Button>
    </Grid>
  );
};

PaymentDetailNotFound.propTypes = {
  message: PropTypes.string.isRequired,
  goToBack: PropTypes.string.isRequired,
};

export default PaymentDetailNotFound;
