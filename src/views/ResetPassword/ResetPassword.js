import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { TextField, Typography } from "@material-ui/core";

import { useSnackbar } from "notistack";

import LoadingButton from "core/Components/LoadingButton";
import { Minimal } from "core/Layouts";
import resetPasswordAPI from "api/user/reset-password";

const schema = {
  password: {
    presence: { allowEmpty: false, message: "is required" },
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
  const token = props.match.params.token;

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

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (formState.values.password !== formState.values.confirmPassword) {
      enqueueSnackbar("Password does not match", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }

    setLoading(true);

    const response = await resetPasswordAPI(token, formState.values.password);

    if (!response.error) {
      enqueueSnackbar(response.message, {
        variant: "success",
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
      <form className={classes.form} onSubmit={handleResetPassword}>
        <Typography className={classes.title} variant="h2">
          Reset Password
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Enter your new password
        </Typography>
        <TextField
          className={classes.textField}
          error={hasError("password")}
          fullWidth
          helperText={
            hasError("password") ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError("confirmPassword")}
          fullWidth
          helperText={
            hasError("confirmPassword")
              ? formState.errors.confirmPassword[0]
              : null
          }
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={formState.values.confirmPassword || ""}
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
