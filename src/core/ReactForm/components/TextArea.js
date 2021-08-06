import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FieldLayout from "./Fieldlayout";

const TextArea = (props) => {
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
        type="text"
        variant="outlined"
        multiline
        value={inputValue}
        onChange={handleChange}
        rows={4}
        {...rest}
      />
    </FieldLayout>
  );
};

TextArea.propTypes = {
  input: PropTypes.object.isRequired,
  inputvalue: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

export default React.memo(TextArea, (prevState, nextState) => {
  if (prevState.input.forceRender) {
    return false;
  }
  return (
    prevState.inputvalue === nextState.inputvalue &&
    prevState.error === nextState.error &&
    prevState.helperText === nextState.helperText
  );
});
