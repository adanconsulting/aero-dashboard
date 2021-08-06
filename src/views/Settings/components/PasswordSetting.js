import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  TextField,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import { updateUserAPI } from "api/user/user";
import { useSnackbar } from "notistack";
import LoadingButton from "core/Components/LoadingButton";

const useStyles = makeStyles(() => ({
  root: {},
}));

const PasswordSetting = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const userData = useSelector((state) => state.user);

  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!values.password) {
      enqueueSnackbar("Password filed not be empty", { variant: "error" });
      return;
    }

    if (values.password !== values.confirm) {
      enqueueSnackbar("Password does not match", { variant: "error" });
      return;
    }

    setLoading(true);

    const data = {
      password: values.password,
    };

    const response = await updateUserAPI(
      userData.token,
      userData.user_id,
      data
    );
    if (!response.error) {
      enqueueSnackbar("User password updated", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }

    setLoading(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleOnSubmit}>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: "1rem" }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <LoadingButton
            circleStyle={{ left: "20%" }}
            loading={loading}
            title="Update"
            type="submit"
          />
        </CardActions>
      </form>
    </Card>
  );
};

PasswordSetting.propTypes = {
  className: PropTypes.string,
};

export default PasswordSetting;
