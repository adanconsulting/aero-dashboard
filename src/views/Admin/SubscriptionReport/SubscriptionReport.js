import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ReactTable from "core/ReactTable";
import transaction_column from "common/TableColumns/transaction_column";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import subscriptionReportAPI from "api/admin/subscription-report";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import DateFormat from "core/utils/DateFormat";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import { useHistory } from "react-router-dom";

const SubscriptionReport = (props) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const userToken = useSelector((state) => state.user.token);
  const userId = props.match.params.id;
  const [report, setReportData] = useState();

  const loadReportData = async () => {
    const response = await subscriptionReportAPI(userToken, userId);
    if (!response.error) {
      setReportData(response);
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
      history.goBack();
    }
  };

  useEffect(() => {
    loadReportData();
  }, [userId]);

  if (!report) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} style={{ backgroundColor: "#f5fbfe" }}>
          <Grid item xs={1}>
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h1">Subscription Info</Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <Typography>
              Subscription ID: <b>{report.plan.id}</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              Status:{" "}
              {report.plan.status.toLowerCase() ? (
                <b style={{ color: "green" }}>{report.plan.status}</b>
              ) : (
                <b style={{ color: "red" }}>{report.plan.status}</b>
              )}
            </Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={1} />
          <Grid item xs={11}>
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: 3,
                padding: 8,
                display: "inline-block",
              }}
            >
              <Typography>
                Next payment due on:{" "}
                <b>
                  <DateFormat date={report.plan.next_payment_time} />
                </b>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: 8 }}>
          <Grid item xs={12}>
            <Typography variant="h1">Subscriber</Typography>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <Typography>Subscriber Name:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{report.subscriber.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Subscriber Email:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{report.subscriber.email}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Subscriber Address:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{report.subscriber.address}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Start date:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              <DateFormat date={report.plan.start_time} />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Late payment date:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              <DateFormat date={report.plan.last_payment_time} />
            </Typography>
          </Grid>
        </Grid>
        <ReactTable
          style={{ marginTop: 10 }}
          title="Payment information"
          columns={transaction_column}
          data={report.transactions}
          options={{
            selection: false,
            actionsColumnIndex: -1,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default SubscriptionReport;
