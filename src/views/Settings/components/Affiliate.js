import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";

import affiliate_user_column from "common/TableColumns/affiliate_user_column";
import ReactTable from "core/ReactTable";
import { formatMoney } from "core/utils/format_util";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import TableSkeleton from "core/Skeleton/TableSkeleton";
import DashboardActions from "store/actions/dashboard_actions";
import dashboardAPI from "api/dashboard/dashboard";
import { isEmptyObject } from "core/utils/object_util";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Affiliate = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const userData = useSelector((state) => state.user);
  const dashboardData = useSelector((state) => state.dashboard);

  const loadDashboardData = async () => {
    if (isEmptyObject(dashboardData)) {
      const response = await dashboardAPI(userData.token);
      if (!response.error) {
        DashboardActions.loadData(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (isEmptyObject(dashboardData)) {
    return null;
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subheader={
          <>
            <Typography>
              Share affiliate link and earn $15 USD on every signup. Below is
              your affiliate link
            </Typography>
            <br />
            <Typography>
              {`https://areoland.com/affiliate/${userData.user_id}`}
            </Typography>
          </>
        }
        title="Affiliate"
      />
      <Divider />
      <CardContent style={{ padding: 0 }}>
        <Grid container spacing={6} wrap="wrap">
          <Grid className={classes.item} item xs={12}>
            {isEmptyObject(dashboardData) ? (
              <TableSkeleton cols={5} rows={5} />
            ) : (
              <ReactTable
                options={{
                  search: false,
                }}
                columns={affiliate_user_column}
                data={dashboardData.affiliate_earn.user_list}
                title="Affiliated Users"
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Typography
          style={{ fontWeight: 700 }}
          color="textSecondary"
          gutterBottom
        >
          Total Earn: ${formatMoney(dashboardData.affiliate_earn.totalEarn)}
          <br />
          Total Paid: ${formatMoney(dashboardData.affiliate_earn.totalPaid)}
        </Typography>
      </CardActions>
    </Card>
  );
};

Affiliate.propTypes = {
  className: PropTypes.string,
};

export default Affiliate;
