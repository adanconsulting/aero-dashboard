import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FieldLayout from "./Fieldlayout";

const SelectField = (props) => {
  const { input, callback, ...rest } = props;
  const [inputValue, setInputValue] = useState(
    props.inputvalue || input.options[0].value
  );

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
        select
        value={inputValue}
        variant="outlined"
        disabled={input.readOnly || false}
        onChange={handleChange}
        {...rest}
      >
        {input.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
            {option.description && (
              <Typography
                style={{
                  position: "absolute",
                  right: 16,
                }}
                variant="caption"
                color="textSecondary"
              >
                {option.description}
              </Typography>
            )}
          </MenuItem>
        ))}
      </TextField>
    </FieldLayout>
  );
};

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  inputvalue: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

export default React.memo(SelectField, (prevState, nextState) => {
  if (prevState.input.forceRender) {
    return false;
  }
  return (
    prevState.inputvalue === nextState.inputvalue &&
    prevState.error === nextState.error &&
    prevState.helperText === nextState.helperText
  );
});
