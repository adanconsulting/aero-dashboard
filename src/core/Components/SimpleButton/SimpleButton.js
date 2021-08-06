import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const SimpleButton = (props) => {
  const { onClick, label, ...rest } = props;

  const theme = useTheme();

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Button
      color={theme.palette.common.primary}
      variant="contained"
      onClick={handleClick}
      {...rest}
    >
      {label}
    </Button>
  );
};

SimpleButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

SimpleButton.defaultProps = {
  label: "Simple Button",
};

export default SimpleButton;
