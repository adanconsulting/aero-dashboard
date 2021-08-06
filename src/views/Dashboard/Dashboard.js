import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import Payable from "./components/Payable";
import TotalProperties from "./components/TotalProperties";
import ActiveProperties from "./components/ActiveProperties";
import AffiliateEarn from "./components/AffiliateEarn";
import TopVendors from "./components/TopVendors";
import VendorReport from "./components/VendorReport";
import DashboardSkeleton from "core/Skeleton/DashboardSkeleton";

import { useSelector } from "react-redux";

import DashboardActions from "store/actions/dashboard_actions";
import dashboardAPI from "api/dashboard/dashboard";
import { isEmptyObject } from "core/utils/object_util";

import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  const dashboardData = useSelector((state) => state.dashboard);
  const userToken = useSelector((state) => state.user.token);

  const loadDashboardData = async () => {
    if (isEmptyObject(dashboardData)) {
      const response = await dashboardAPI(userToken);
      if (!response.error) {
        DashboardActions.loadData(response);
      } else if (response.error.code === 401) {
        history.push("/sign-in");
      } else {
        console.log(response);
      }
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  console.log("Dashboard...");

  if (isEmptyObject(dashboardData)) {
    return <DashboardSkeleton />;
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Payable price={dashboardData.payable} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProperties count={dashboardData.total_properties} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <ActiveProperties percentage={dashboardData.active_properties} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <AffiliateEarn data={dashboardData.affiliate_earn} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <VendorReport
            price={dashboardData.payable}
            data={dashboardData.payable_report}
          />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <TopVendors vendors={dashboardData.top_vendors} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
