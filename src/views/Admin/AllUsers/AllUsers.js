import React, { useEffect, useState, useMemo } from "react";
import ReactTable from "core/ReactTable";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AssessmentIcon from "@material-ui/icons/Assessment";
import UsbIcon from "@material-ui/icons/Usb";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import user_column from "common/TableColumns/user_column";
import UserActions from "store/actions/user_actions";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import allUserAPI from "api/admin/all-users";
import ChangePasswordDialog from "../../../common/Components/ChangePasswordDialog";
import adminLoginAPI from "api/admin/admin-login";
import { formatPhoneNumber } from "core/utils/format_util";
import ExpirationDateDialog from "./components/ExpirationDateDialog";

const getAllUsers = createSelector(
  (state) => state.user,
  (user) => user.allUsers
);
const AllUsers = () => {
  const history = useHistory();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState({});
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openExpirationDialog, setOpenExpirationDialog] = useState(false);

  const allUsersData = useSelector(getAllUsers);
  const userToken = useSelector((state) => state.user.token);

  const mainUsers = useMemo(() => {
    if (allUsersData) {
      return allUsersData.users.filter((user) => user.type !== "vendor");
    }
  }, [allUsersData]);

  const vendorUsers = useMemo(() => {
    if (allUsersData) {
      return allUsersData.users.filter((user) => user.type === "vendor");
    }
  }, [allUsersData]);

  const { enqueueSnackbar } = useSnackbar();

  const loadAllUsers = async () => {
    if (allUsersData === undefined) {
      const response = await allUserAPI(userToken);
      if (!response.error) {
        UserActions.loadAllUsers(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loginToUserAccount = async (data) => {
    const response = await adminLoginAPI(userToken, data.id);
    if (!response.error) {
      UserActions.logout();
      UserActions.signin(response);

      if (response.type === "vendor") {
        //window.location = "/properties";
        history.replace("/properties");
      } else {
        //window.location = "/";
        history.replace("/");
      }
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  const viewSubscriptionReport = (data) => {
    if (data.type === "vendor") {
      enqueueSnackbar("Vendors has no subscription report", {
        variant: "warning",
      });
    } else if (data.account.type === "free") {
      enqueueSnackbar("Free users has no subscription report", {
        variant: "warning",
      });
    } else if (data.account.type === "trial") {
      enqueueSnackbar(
        "User has TRIAL mode so there is no subscription report yet",
        {
          variant: "warning",
        }
      );
    } else {
      history.push(`/admin/subscription-report/${data.id}`);
    }
  };

  const viewAffiliateUsers = (data) => {
    if (!data.affiliate) {
      enqueueSnackbar("No affiliated account from this user", {
        variant: "info",
      });
    } else {
      history.push(`/admin/affiliated-users-of/${data.id}`);
    }
  };

  const setExpirationDate = (data) => {
    setUserData(data);
    setOpenExpirationDialog(true);
  };

  if (!allUsersData) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <>
      <Grid
        container
        spacing={3}
        style={{ backgroundColor: "#f5fbfe", padding: 16 }}
      >
        <Grid item xs={4}>
          <Typography>
            <strong>Main Accounts:</strong>{" "}
            {allUsersData.accountsDetail.totalAccounts}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Expire Accounts:</strong>{" "}
            {allUsersData.accountsDetail.totalExpire}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Earning Per Month:</strong>{" "}
            {allUsersData.accountsDetail.totalActive * 19.97} USD
          </Typography>
        </Grid>
      </Grid>
      <ReactTable
        title="Main Users"
        filtering={["status"]}
        options={{
          selection: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: LockIcon,
            tooltip: "Change Password",
            position: "row",
            onClick: (event, rowData) => {
              setUserId(rowData.id);
              setOpenPasswordDialog(true);
            },
          },
          {
            icon: VpnKeyIcon,
            tooltip: "LOGIN AS",
            position: "row",
            onClick: (event, rowData) => {
              loginToUserAccount(rowData);
            },
          },
          {
            icon: AssessmentIcon,
            tooltip: "Subscription Report",
            position: "row",
            onClick: (event, rowData) => {
              viewSubscriptionReport(rowData);
            },
          },
          {
            icon: UsbIcon,
            tooltip: "Affiliated Users",
            position: "row",
            onClick: (event, rowData) => {
              viewAffiliateUsers(rowData);
            },
          },
          {
            icon: CancelPresentationIcon,
            tooltip: "Set Expiration Date",
            position: "row",
            onClick: (event, rowData) => {
              setExpirationDate(rowData);
            },
          },
        ]}
        detailPanel={(rowData) => {
          return (
            <div style={{ padding: 16 }}>
              <Grid
                container
                spacing={3}
                style={{ backgroundColor: "#f5fbfe" }}
              >
                <Grid item xs={4}>
                  <Typography>
                    <strong>Name: </strong> {rowData.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <strong>Email: </strong> {rowData.email}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <strong>Phone: </strong> {formatPhoneNumber(rowData.phone)}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
        }}
        columns={user_column}
        data={mainUsers}
      />

      <ReactTable
        title="Vendors"
        style={{ marginTop: 16 }}
        options={{
          selection: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: LockIcon,
            tooltip: "Change Password",
            position: "row",
            onClick: (event, rowData) => {
              setUserId(rowData.id);
              setOpenPasswordDialog(true);
            },
          },
          {
            icon: VpnKeyIcon,
            tooltip: "LOGIN AS",
            position: "row",
            onClick: (event, rowData) => {
              loginToUserAccount(rowData);
            },
          },
        ]}
        detailPanel={(rowData) => {
          return (
            <div style={{ padding: 16 }}>
              <Grid
                container
                spacing={3}
                style={{ backgroundColor: "#f5fbfe" }}
              >
                <Grid item xs={4}>
                  <Typography>
                    <strong>Name: </strong> {rowData.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <strong>Email: </strong> {rowData.email}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <strong>Phone: </strong> {formatPhoneNumber(rowData.phone)}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
        }}
        columns={user_column.filter(
          (column) => ["affiliate", "status"].includes(column.field) === false
        )}
        data={vendorUsers}
      />

      <ChangePasswordDialog
        userId={userId}
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      />
      <ExpirationDateDialog
        user={userData}
        open={openExpirationDialog}
        onClose={() => setOpenExpirationDialog(false)}
      />
    </>
  );
};

export default AllUsers;
