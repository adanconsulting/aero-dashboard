import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import FieldLayout from "./Fieldlayout";

const PasswordField = (props) => {
  const { input, callback, ...rest } = props;
  const [inputValue, setInputValue] = useState(props.inputvalue || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((oldState) => !oldState);
  };

  const handleChange = (event) => {
    event.persist();
    setInputValue(event.target.value);
    callback(event);
  };

  useEffect(() => {
    if (props.inputvalue) {
      setInputValue(props.inputvalue);
    }
  }, [props.inputvalue]);

  return (
    <FieldLayout input={input}>
      <TextField
        style={{ marginTop: 16 }}
        fullWidth
        label={input.label}
        name={input.name}
        type={showPassword ? "text" : "password"}
        disabled={input.readOnly || false}
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    </FieldLayout>
  );
};

PasswordField.propTypes = {
  input: PropTypes.object.isRequired,
  inputvalue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callback: PropTypes.func.isRequired,
};

export default React.memo(PasswordField, (prevState, nextState) => {
  if (prevState.input.forceRender) {
    return false;
  }
  return (
    prevState.inputvalue === nextState.inputvalue &&
    prevState.error === nextState.error &&
    prevState.helperText === nextState.helperText
  );
});
