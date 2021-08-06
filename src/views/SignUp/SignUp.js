import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import CreateAccount from "./components/CreateAccount";
import PhoneVerification from "./components/PhoneVerification";
import { useSnackbar } from "notistack";

import ReactGA from "react-ga";
import firebase from "firebase-app";
import signupAPI from "api/user/signup";
import { Minimal } from "core/Layouts";

const SignUp = (props) => {
  const { history } = props;

  const formData = useRef({});

  const { enqueueSnackbar } = useSnackbar();

  const [showPhoneVerification, setShowPhoneVerification] = useState(false);

  const onFormSubmit = async (formValues) => {
    formData.current = formValues;
    const phoneNumber = "+" + formValues.phone;
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setShowPhoneVerification(true);
    } catch (error) {
      // Error; SMS not sent
      let errMessage = error.message;

      if (error.message === "TOO_SHORT") {
        errMessage = "Phone number is too short";
      }

      enqueueSnackbar(errMessage, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const onCodeVerification = async (formValues) => {
    const code = formValues.code;
    try {
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
      const userData = {
        uid: user.uid,
        username: formData.current.username,
        password: formData.current.password,
        type: "main",
        name: formData.current.name,
        email: formData.current.email,
        phone: formData.current.phone,
        address: formData.current.address,
        city: formData.current.city,
        state: formData.current.state,
        zip: formData.current.zip,
        affiliate: props.match.params.affiliate,
      };

      const response = await signupAPI(userData);
      if (!response.error) {
        // Send GA events
        ReactGA.event({
          category: "User",
          action: "Trial User Created",
        });

        // Redirect to sign in page
        history.replace("/sign-in");
      } else {
        enqueueSnackbar(response.error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      // User couldn't sign in (bad verification code?)
      enqueueSnackbar("Invalid verification code", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <Minimal>
      {showPhoneVerification ? (
        <PhoneVerification
          onVerificationSubmit={onCodeVerification}
          onBack={() => setShowPhoneVerification(false)}
        />
      ) : (
        <CreateAccount onSubmit={onFormSubmit} formData={formData.current} />
      )}
    </Minimal>
  );
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignUp);
