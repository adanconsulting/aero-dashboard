import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FieldLayout from "./Fieldlayout";

const SimpleTextField = (props) => {
  const { input, callback, ...rest } = props;
  const [inputValue, setInputValue] = useState(props.inputvalue || "");

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
        type={input.subtype || "text"}
        disabled={input.readOnly || false}
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
        {...rest}
      />
    </FieldLayout>
  );
};

SimpleTextField.propTypes = {
  input: PropTypes.object.isRequired,
  inputvalue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callback: PropTypes.func.isRequired,
};

//export default SimpleTextField;
export default React.memo(SimpleTextField, (prevState, nextState) => {
  if (prevState.input.forceRender) {
    return false;
  }
  return (
    prevState.inputvalue === nextState.inputvalue &&
    prevState.error === nextState.error &&
    prevState.helperText === nextState.helperText
  );
});
