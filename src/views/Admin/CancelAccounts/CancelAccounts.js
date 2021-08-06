import React, { useEffect, useState } from "react";
import ReactTable from "core/ReactTable";
import BlockIcon from "@material-ui/icons/Block";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import TableSkeleton from "core/Skeleton/TableSkeleton";
import DateFormat from "core/utils/DateFormat";
import {
  accountsToCancelAPI,
  cancelAccountAPI,
} from "api/admin/cancel-account";
import AppActions from "store/actions/app_actions";

const table_columns = [
  { title: "Name", field: "user.name" },
  { title: "Username", field: "user.username" },
  { title: "Email", field: "user.email" },
  { title: "Account Type", field: "user.account_type" },
  {
    title: "Requested On",
    field: "requested_on",
    render: (data) => <DateFormat date={data.requested_on} />,
  },
  { title: "Status", field: "status" },
];

const CancelAccounts = () => {
  const [accountsData, setAccountsData] = useState([]);
  const userToken = useSelector((state) => state.user.token);

  const { enqueueSnackbar } = useSnackbar();

  const loadAccountsToCancel = async () => {
    if (!accountsData.length) {
      const response = await accountsToCancelAPI(userToken);
      if (!response.error) {
        setAccountsData(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  const cancelUserAccount = async (data) => {
    AppActions.loading(true, "Disabling user account...");
    const response = await cancelAccountAPI(userToken, data.user_id);
    if (!response.error) {
      enqueueSnackbar("User Account is successfully disabled", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
    AppActions.loading(false, null);
  };

  useEffect(() => {
    loadAccountsToCancel();
  }, []);

  if (!accountsData.length) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <>
      <ReactTable
        title="Requests to cancel Accounts"
        filtering={["status"]}
        options={{
          selection: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: BlockIcon,
            tooltip: "Cancel this User Account",
            position: "row",
            onClick: (event, rowData) => {
              cancelUserAccount(rowData);
            },
          },
        ]}
        columns={table_columns}
        data={accountsData}
      />
    </>
  );
};

export default CancelAccounts;
