import React from "react";
import PropTypes from "prop-types";
import FieldLayout from "./Fieldlayout";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = (props) => {
  const { input, onChange, ...rest } = props;

  return (
    <FieldLayout input={input}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          label={input.label}
          format="MM/dd/yyyy"
          placeholder="MM/dd/yyyy"
          disabled={input.readOnly || false}
          onChange={(date) => onChange(input.name, date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          inputVariant="outlined"
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </FieldLayout>
  );
};

DatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
