import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import FieldLayout from "./Fieldlayout";

const phoneFormat = (val) => {
  val = val + "__________";
  if (val.length <= 21) {
    return (
      "+" +
      val.substr(0, 1) +
      " " +
      "(" +
      val.substr(1, 3) +
      ")" +
      " " +
      val.substr(4, 3) +
      "-" +
      val.substr(7, 4)
    );
  } else {
    return (
      "+" +
      val.substr(0, 2) +
      " " +
      "(" +
      val.substr(2, 3) +
      ")" +
      " " +
      val.substr(5, 3) +
      "-" +
      val.substr(8, 4)
    );
  }
};

const NumberField = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(props.name, values.value);
      }}
      format={phoneFormat}
      mask="_"
    />
  );
};

const PhoneNumberField = (props) => {
  const { input, callback, ...rest } = props;
  const [inputValue, setInputValue] = useState(props.inputvalue || "");

  const handleChange = (name, value) => {
    setInputValue(value);
    callback(name, value);
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
        variant="outlined"
        placeholder="+1 (123) 456-7890"
        disabled={input.readOnly || false}
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          inputComponent: NumberField,
        }}
        {...rest}
      />
    </FieldLayout>
  );
};

PhoneNumberField.propTypes = {
  input: PropTypes.object.isRequired,
  inputvalue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callback: PropTypes.func.isRequired,
};

export default React.memo(PhoneNumberField, (prevState, nextState) => {
  if (prevState.input.forceRender) {
    return false;
  }
  return (
    prevState.inputvalue === nextState.inputvalue &&
    prevState.error === nextState.error &&
    prevState.helperText === nextState.helperText
  );
});
