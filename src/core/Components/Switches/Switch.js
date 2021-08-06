import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const Switches = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(props.checked);

  const handleChange = (event) => {
    setValue(event.target.checked);
    if (props.onChange) props.onChange(event.target.checked);
  };

  return (
    <Switch
      checked={value}
      onChange={handleChange}
      color={theme.palette.common.primary}
      name={props.name}
    />
  );
};

Switches.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Switches.defaultProps = {
  checked: false,
};

export default Switches;
