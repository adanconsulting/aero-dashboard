import React from "react";
import { useTheme } from "@material-ui/core/styles";
import LoadingButton from "core/Components/LoadingButton";

const SubmitButton = (props) => {
  const { input, enableSubmitButton, loading, ...rest } = props;
  const theme = useTheme();

  return (
    <LoadingButton
      style={{ margin: theme.spacing(2, 0) }}
      color={theme.palette.common.primary}
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      title={input.label}
      loading={loading}
      disabled={enableSubmitButton || loading}
      {...rest}
    />
  );
};

export default SubmitButton;
