import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardActions, Divider } from "@material-ui/core";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import LoadingButton from "core/Components/LoadingButton";
import requestCancelAccountAPI from "api/user/request-cancel-account";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const CancelAccount = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const userToken = useSelector((state) => state.user.token);

  const cancelAccount = async () => {
    setLoading(true);
    const response = await requestCancelAccountAPI(userToken);
    if (!response.error) {
      enqueueSnackbar(
        "Your request is send to cancel account, we will inform you via email",
        {
          variant: "success",
        }
      );
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
    setLoading(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="Cancel Account"
        subheader="If you cancel you can use account until your paid month end"
      />
      <Divider />
      <CardActions>
        <LoadingButton
          onClick={cancelAccount}
          circleStyle={{ left: "20%" }}
          loading={loading}
          color="secondary"
          title="Cancel account"
        />
      </CardActions>
    </Card>
  );
};

export default CancelAccount;
