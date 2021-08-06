import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { Link, Typography } from "@material-ui/core";
import NumberField from "core/Components/NumberField";
import LoadingButton from "core/Components/LoadingButton";

const schema = {
  code: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 6,
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
  textField: {
    marginTop: theme.spacing(2),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
}));

const PhoneVerification = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

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

  const handleCodeChange = (name, value) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value,
      },
      touched: {
        ...formState.touched,
        [name]: true,
      },
    }));
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    setLoading(true);
    await props.onVerificationSubmit(formState.values);
    setLoading(false);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form className={classes.form} onSubmit={handleVerification}>
      <Typography className={classes.title} variant="h1">
        Verify Phone numebr
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        You have to verify your phone number before you register
      </Typography>

      <NumberField
        className={classes.textField}
        placeholder="# # # # # #"
        format="# # # # # #"
        mask="#"
        error={hasError("code")}
        fullWidth
        helperText={hasError("code") ? formState.errors.code[0] : null}
        label="Verification code"
        name="code"
        onChange={handleCodeChange}
        type="text"
        value={formState.values.code || ""}
        variant="outlined"
      />

      <LoadingButton
        title="Verify Phone"
        className={classes.signUpButton}
        loading={loading}
        disabled={!formState.isValid || loading}
        fullWidth
        size="large"
        type="submit"
      />
      <Typography color="textSecondary" variant="body1">
        Change Phone?{" "}
        <Link variant="h6" onClick={props.onBack} style={{ cursor: "pointer" }}>
          go back
        </Link>
      </Typography>
    </form>
  );
};

PhoneVerification.propTypes = {
  onVerificationSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PhoneVerification;
