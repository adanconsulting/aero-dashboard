import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Tooltip,
  Button,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ReactForm from "core/ReactForm";

import { useSelector } from "react-redux";
import { mapFormValues } from "core/ReactForm/components/utils";
import { updateUserAPI } from "api/user/user";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import UserActions from "store/actions/user_actions";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const AccountSetting = (props) => {
  const history = useHistory();
  const { className, ...rest } = props;
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [serverLaod, setServerLaod] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "textfield",
      name: "username",
      label: "Username",
      readOnly: true,
    },
    {
      type: "textfield",
      name: "name",
      label: "Name",
    },
    {
      type: "phonenumber",
      name: "phone",
      label: "Phone",
    },
    {
      type: "textfield",
      name: "email",
      label: "Email",
      schema: {
        email: {
          email: true,
        },
      },
    },
    {
      type: "textfield",
      name: "address",
      label: "Address",
    },
    {
      type: "textfield",
      name: "city",
      label: "City",
    },
    {
      type: "textfield",
      name: "state",
      label: "State",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "zip",
      label: "Zip",
    },
    {
      type: "submit",
      label: "Update Account Setting",
    },
  ]);

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    setFormData((data) => mapFormValues(data, userData));
    setServerLaod(true);
  }, [userData]);

  const handleFormSubmit = async (data) => {
    const response = await updateUserAPI(
      userData.token,
      userData.user_id,
      data
    );
    if (!response.error) {
      UserActions.updateUser(response);
      enqueueSnackbar("User updated successfully", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  const handleLogout = () => {
    UserActions.logout();
    history.push("/sign-in");
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subheader="Manage account setting"
        title="Account"
        action={
          <Tooltip title="Logout">
            <Button onClick={handleLogout} startIcon={<ExitToAppIcon />}>
              Logout
            </Button>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={6} wrap="wrap">
          <Grid className={classes.item} item xs={12}>
            <ReactForm
              data={formData}
              serverLoad={serverLaod}
              onSubmit={handleFormSubmit}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AccountSetting.propTypes = {
  className: PropTypes.string,
};

export default AccountSetting;
