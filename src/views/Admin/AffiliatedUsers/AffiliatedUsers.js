import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PaymentIcon from "@material-ui/icons/Payment";
import ReactTable from "core/ReactTable";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { formatMoney } from "core/utils/format_util";
import { isEmptyObject } from "core/utils/object_util";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import affiliatedUserAPI from "api/admin/affiliated-users";
import affiliated_users_of_column from "common/TableColumns/affiliated_users_of_column";
import DateFormat from "core/utils/DateFormat";

const useStyles = makeStyles({
  container: {
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: 700,
  },
});

const AffiliatedUsers = (props) => {
  const classes = useStyles();

  const userId = props.match.params.id;
  const { enqueueSnackbar } = useSnackbar();
  const userToken = useSelector((state) => state.user.token);
  const [data, setData] = useState({});

  const loadAffiliatedUsers = async () => {
    if (isEmptyObject(data)) {
      const response = await affiliatedUserAPI(userToken, userId);
      if (!response.error) {
        setData(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadAffiliatedUsers();
  }, []);

  const goToPayNow = () => {
    props.history.push(`/admin/affiliated-pay/${userId}`);
  };

  if (isEmptyObject(data)) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <>
      <Card>
        <CardContent style={{ padding: 0 }}>
          <div className={classes.container}>
            <ReactTable
              title="Affiliated Users"
              options={{
                selection: false,
                actionsColumnIndex: -1,
              }}
              columns={affiliated_users_of_column}
              data={data.user_list}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Total payable: ${formatMoney(data.user_list.length * 15)} - $
            {formatMoney(data.total_paid)} = $
            {formatMoney(data.user_list.length * 15 - data.total_paid)}
          </Typography>
          <Tooltip title="Pay Now">
            <IconButton onClick={goToPayNow}>
              <PaymentIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <CardContent style={{ padding: 0 }}>
          <div className={classes.container}>
            <ReactTable
              title="Paid History"
              options={{
                selection: false,
                actionsColumnIndex: -1,
              }}
              columns={[
                {
                  title: "Paid On",
                  field: "paid_on",
                  render: (rowData) => <DateFormat date={rowData.paid_on} />,
                },
                {
                  title: "Note",
                  field: "note",
                },
                { title: "Amount", field: "amount", type: "currency" },
              ]}
              data={data.paid_history}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Total Paid: ${formatMoney(data.total_paid)}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default AffiliatedUsers;
