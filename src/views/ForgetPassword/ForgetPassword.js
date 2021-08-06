import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { TextField, Typography } from "@material-ui/core";

import { useSnackbar } from "notistack";

import LoadingButton from "core/Components/LoadingButton";
import { Minimal } from "core/Layouts";
import forgetPasswordAPI from "api/user/forget-password";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 70,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const ForgetPassword = (props) => {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleForgetPassword = async (event) => {
    event.preventDefault();

    setLoading(true);

    const response = await forgetPasswordAPI(formState.values.email);

    if (!response.error) {
      enqueueSnackbar(response.message, {
        variant: response.variant,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(response.error.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }

    setLoading(false);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Minimal>
      <form className={classes.form} onSubmit={handleForgetPassword}>
        <Typography className={classes.title} variant="h2">
          Forget Password
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Use your account email to recover
        </Typography>
        <TextField
          className={classes.textField}
          error={hasError("email")}
          fullWidth
          helperText={hasError("email") ? formState.errors.email[0] : null}
          label="Email"
          name="email"
          onChange={handleChange}
          type="text"
          value={formState.values.email || ""}
          variant="outlined"
        />
        <LoadingButton
          title="Recover"
          className={classes.signInButton}
          loading={loading}
          disabled={!formState.isValid || loading}
          fullWidth
          size="large"
          type="submit"
        />
      </form>
    </Minimal>
  );
};

ForgetPassword.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPassword);
