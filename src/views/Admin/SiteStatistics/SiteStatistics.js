import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Line } from "react-chartjs-2";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import { useSnackbar } from "notistack";
import siteStatisticsAPI from "api/admin/site-statistics";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SiteStatistics = (props) => {
  const theme = useTheme();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const userToken = useSelector((state) => state.user.token);
  const [stats, setStats] = useState();

  const loadStatsData = async () => {
    const response = await siteStatisticsAPI(userToken);
    if (!response.error) {
      setStats(response);
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
      history.goBack();
    }
  };

  useEffect(() => {
    loadStatsData();
  }, []);

  if (!stats) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <div>
      <Typography variant="h1" component="span">
        New Users
      </Typography>
      <Typography variant="caption"> (Last 30 days data) </Typography>
      <div style={{ marginBottom: theme.spacing(2) }}>
        <Line
          height={50}
          data={{
            labels: stats.user.labels,
            datasets: [
              {
                label: "Main",
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                data: stats.user.data,
                fill: false,
              },
              {
                label: "Trial",
                data: stats.trial_user.data,
                fill: false,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    stepSize: 1,
                  },
                },
              ],
            },
          }}
        />
      </div>

      <Typography variant="h1" component="span">
        Propteries Creation
      </Typography>
      <Typography variant="caption"> (Last 30 days data) </Typography>
      <div style={{ marginBottom: theme.spacing(2) }}>
        <Line
          height={50}
          data={{
            labels: stats.property.labels,
            datasets: [
              {
                label: "New",
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                data: stats.property.data,
                fill: false,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    stepSize: 1,
                  },
                },
              ],
            },
          }}
        />
      </div>

      <Typography variant="h1" component="span">
        Photos Uploaded
      </Typography>
      <Typography variant="caption"> (Last 30 days data) </Typography>
      <div style={{ marginBottom: theme.spacing(2) }}>
        <Line
          height={50}
          data={{
            labels: stats.photo.labels,
            datasets: [
              {
                label: "New",
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                data: stats.photo.data,
                fill: false,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    stepSize: 1,
                  },
                },
              ],
            },
          }}
        />
      </div>

      <Typography variant="h1" component="span">
        New Vendors
      </Typography>
      <Typography variant="caption"> (Last 30 days data) </Typography>
      <div style={{ marginBottom: theme.spacing(2) }}>
        <Line
          height={50}
          data={{
            labels: stats.vendor.labels,
            datasets: [
              {
                label: "New",
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                data: stats.vendor.data,
                fill: false,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    stepSize: 1,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default SiteStatistics;
