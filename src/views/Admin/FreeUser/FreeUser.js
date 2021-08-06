import React, { useState, useEffect, useRef } from "react";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { TextField, Typography } from "@material-ui/core";
import NumberField from "core/Components/NumberField";

import {
  checkUsernameAPI,
  checkEmailAPI,
  checkPhoneAPI,
} from "api/user/availability";
import signupAPI from "api/user/signup";
import LoadingButton from "core/Components/LoadingButton";
import ReactGA from "react-ga";
import { useSnackbar } from "notistack";
import { uid } from "core/utils/utils";

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
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
}));

const FreeUser = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

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

    const userData = {
      uid: uid("free-"),
      username: formState.values.username,
      password: formState.values.password,
      type: "main",
      name: formState.values.name,
      email: formState.values.email,
      phone: formState.values.phone,
      accountType: "free",
      address: "Not Provided",
      city: "Not Provided",
      state: "Not Provided",
      zip: "Not Provided",
    };
    const response = await signupAPI(userData);
    if (!response.error) {
      // Send GA events
      ReactGA.event({
        category: "User",
        action: "Trial User Created",
      });
      enqueueSnackbar("Free Account is created", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.error.message, {
        variant: "error",
      });
    }

    setLoading(false);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

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
        Create free account
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        These accounts are free and not charge anything from user.
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
        format="+1 (###) ###-####"
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

      <LoadingButton
        title="Create Free Account"
        className={classes.signUpButton}
        loading={loading}
        disabled={!formState.isValid || loading}
        fullWidth
        size="large"
        type="submit"
      />
    </form>
  );
};

export default FreeUser;
