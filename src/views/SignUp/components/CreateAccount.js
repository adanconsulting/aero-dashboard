import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Grid,
} from "@material-ui/core";
import NumberField from "core/Components/NumberField";

import firebase from "firebase-app";
import {
  checkUsernameAPI,
  checkEmailAPI,
  checkPhoneAPI,
} from "api/user/availability";
import LoadingButton from "core/Components/LoadingButton";

const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 50,
    },
  },
  phone: {
    presence: { allowEmpty: false, message: "is required" },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
  address: {
    presence: { allowEmpty: false, message: "is required" },
  },
  city: {
    presence: { allowEmpty: false, message: "is required" },
  },
  state: {
    presence: { allowEmpty: false, message: "is required" },
  },
  zip: {
    presence: { allowEmpty: false, message: "is required" },
  },
  policy: {
    presence: { allowEmpty: false, message: "is required" },
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

const CreateAccount = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  let delayDebounceFn = useRef(1);
  const [usernameChecker, setUsernameChecker] = useState({
    error: false,
    text: null,
  });
  const [emailChecker, setEmailChecker] = useState({
    error: false,
    text: null,
  });
  const [phoneChecker, setPhoneChecker] = useState({
    error: false,
    text: null,
  });

  const [captchaSolved, setCaptchaSolved] = useState(false);

  const [formState, setFormState] = useState({
    isValid: false,
    values: props.formData || {},
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

  const handlePhoneChange = (name, value) => {
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

    clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => {
      availabilityChecker(name, value);
    }, 500);
  };

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

    clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => {
      availabilityChecker(event.target.name, event.target.value);
    }, 500);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    await props.onSubmit(formState.values);
    setLoading(false);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          setCaptchaSolved(true);
        },
        "expired-callback": function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          setCaptchaSolved(false);
        },
      }
    );

    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const availabilityChecker = async (type, value) => {
    if (type === "username") {
      setUsernameChecker({
        error: hasError(type),
        text: formState.errors[type] ? formState.errors[type][0] : null,
      });

      if (!hasError(type)) {
        const checkUsername = await checkUsernameAPI(value);

        if (checkUsername.error) {
          setUsernameChecker({
            error: true,
            text: checkUsername.error.message,
          });
        } else {
          setUsernameChecker({
            error: !checkUsername.available,
            text: checkUsername.message,
          });
        }
      }
    } else if (type === "email") {
      setEmailChecker({
        error: hasError(type),
        text: formState.errors[type] ? formState.errors[type][0] : null,
      });

      if (!hasError(type)) {
        const checkEmail = await checkEmailAPI(value);
        if (checkEmail.error) {
          setEmailChecker({
            error: true,
            text: checkEmail.error.message,
          });
        } else if (!checkEmail.available) {
          setEmailChecker({
            error: !checkEmail.available,
            text: checkEmail.message,
          });
        } else {
          setEmailChecker({
            error: false,
            text: null,
          });
        }
      }
    } else if (type === "phone") {
      setPhoneChecker({
        error: hasError(type),
        text: formState.errors[type] ? formState.errors[type][0] : null,
      });

      if (!hasError(type)) {
        const checkPhone = await checkPhoneAPI(value);
        if (checkPhone.error) {
          setPhoneChecker({
            error: true,
            text: checkPhone.error.message,
          });
        } else if (!checkPhone.available) {
          setPhoneChecker({
            error: !checkPhone.available,
            text: checkPhone.message,
          });
        } else {
          setPhoneChecker({
            error: false,
            text: null,
          });
        }
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSignUp}>
      <Typography className={classes.title} variant="h1">
        Create new account
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Use your email to create new account
      </Typography>
      <TextField
        className={classes.textField}
        error={usernameChecker.error}
        fullWidth
        helperText={usernameChecker.text}
        label="Username"
        name="username"
        onChange={handleChange}
        type="text"
        value={formState.values.username || ""}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        error={hasError("name")}
        fullWidth
        helperText={hasError("name") ? formState.errors.name[0] : null}
        label="Full name"
        name="name"
        onChange={handleChange}
        type="text"
        value={formState.values.name || ""}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        error={emailChecker.error}
        fullWidth
        helperText={emailChecker.text}
        label="Email address"
        name="email"
        onChange={handleChange}
        type="text"
        value={formState.values.email || ""}
        variant="outlined"
      />
      <NumberField
        className={classes.textField}
        placeholder="+1 (123) 456-7890"
        format="phone"
        mask="_"
        error={phoneChecker.error}
        fullWidth
        helperText={phoneChecker.text}
        label="Phone number"
        name="phone"
        onChange={handlePhoneChange}
        type="text"
        value={formState.values.phone || ""}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        error={hasError("password")}
        fullWidth
        helperText={hasError("password") ? formState.errors.password[0] : null}
        label="Password"
        name="password"
        onChange={handleChange}
        type="password"
        value={formState.values.password || ""}
        variant="outlined"
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            className={classes.textField}
            error={hasError("address")}
            fullWidth
            helperText={
              hasError("address") ? formState.errors.address[0] : null
            }
            label="Address"
            name="address"
            onChange={handleChange}
            type="text"
            value={formState.values.address || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            error={hasError("city")}
            fullWidth
            helperText={hasError("city") ? formState.errors.city[0] : null}
            label="City"
            name="city"
            onChange={handleChange}
            type="text"
            value={formState.values.city || ""}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            error={hasError("state")}
            fullWidth
            helperText={hasError("state") ? formState.errors.state[0] : null}
            label="State"
            name="state"
            onChange={handleChange}
            type="text"
            value={formState.values.state || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            error={hasError("zip")}
            fullWidth
            helperText={hasError("zip") ? formState.errors.zip[0] : null}
            label="Zip"
            name="zip"
            onChange={handleChange}
            type="number"
            value={formState.values.zip || ""}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <div className={classes.policy}>
        <Checkbox
          checked={formState.values.policy || false}
          className={classes.policyCheckbox}
          color="primary"
          name="policy"
          onChange={handleChange}
        />
        <Typography
          className={classes.policyText}
          color="textSecondary"
          variant="body1"
        >
          I agree{" "}
          <Link
            color="primary"
            component={RouterLink}
            to="/terms-and-conditions"
            underline="always"
            variant="h6"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            color="primary"
            component={RouterLink}
            to="/privacy-policy"
            underline="always"
            variant="h6"
          >
            Privacy Policy
          </Link>
        </Typography>
      </div>
      {hasError("policy") && (
        <FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
      )}
      <div className={classes.policy}>
        <div id="recaptcha-container"></div>
      </div>

      <LoadingButton
        title="Sign up now"
        className={classes.signUpButton}
        loading={loading}
        disabled={!formState.isValid || !captchaSolved || loading}
        fullWidth
        size="large"
        type="submit"
      />
      <Typography color="textSecondary" variant="body1">
        Have an account?{" "}
        <Link component={RouterLink} to="/sign-in" variant="h6">
          Sign in
        </Link>
      </Typography>
    </form>
  );
};

CreateAccount.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

export default CreateAccount;
