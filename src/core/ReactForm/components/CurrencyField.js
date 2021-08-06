import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import FieldLayout from "./Fieldlayout";

const NumberField = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(props.name, values.value);
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
};

const CurrencyField = (props) => {
  const { input, callback, ...rest } = props;
  const [inputValue, setInputValue] = useState(props.inputvalue || "");

  const handleChange = (name, value) => {
    const v = parseFloat(value);
    setInputValue(v);
    callback(name, v);
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
        disabled={input.readOnly || false}
        onChange={handleChange}
        value={inputValue}
        InputProps={{
          inputComponent: NumberField,
        }}
        {...rest}
      />
    </FieldLayout>
  );
};

CurrencyField.propTypes = {
  input: PropTypes.object.isRequired,
  inputvalue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callback: PropTypes.func.isRequired,
};

export default React.memo(CurrencyField, (prevState, nextState) => {
  if (prevState.input.forceRender) {
    return false;
  }

  return (
    prevState.inputvalue === nextState.inputvalue &&
    prevState.error === nextState.error &&
    prevState.helperText === nextState.helperText
  );
});
