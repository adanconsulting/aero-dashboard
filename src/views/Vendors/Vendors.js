import React, { useState, useEffect } from "react";
import ReactTable from "core/ReactTable";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import vendors_column from "common/TableColumns/vendors_column";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import { deleteVendorsAPI, loadAllVendorsAPI } from "api/vendor/vendor";
import VendorActions from "store/actions/vendor_actions";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import ChangePasswordDialog from "common/Components/ChangePasswordDialog";

const getAllVendors = createSelector(
  (state) => state.vendor,
  (vendor) => vendor.all
);

const Vendors = () => {
  const history = useHistory();
  const vendorsData = useSelector(getAllVendors);
  const userToken = useSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordUserId, setPasswordUserId] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const loadAllVendors = async () => {
    if (!vendorsData.length) {
      setLoading(true);
      const response = await loadAllVendorsAPI(userToken);
      setLoading(false);
      if (!response.error) {
        VendorActions.loadAllVendors(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadAllVendors();
  }, []);

  const deleteVendors = async (rowIds) => {
    const response = await deleteVendorsAPI(userToken, rowIds);
    if (!response.error) {
      VendorActions.deleteVendors(rowIds);
      enqueueSnackbar("Vendors deleted successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  if (loading) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <>
      <ReactTable
        title="Vendors"
        onDelete={deleteVendors}
        actions={[
          {
            tooltip: "Add",
            icon: AddBoxIcon,
            isFreeAction: true,
            onClick: (evt, data) => {
              history.push("/vendor/new");
            },
          },
          {
            icon: EditIcon,
            tooltip: "View/Edit",
            position: "row",
            onClick: (event, rowData) =>
              history.push(`/vendor/detail/${rowData.id}`),
          },
          {
            icon: LockIcon,
            tooltip: "Change Password",
            position: "row",
            onClick: (event, rowData) => {
              setPasswordUserId(rowData.id);
              setOpenPasswordDialog(true);
            },
          },
        ]}
        columns={vendors_column}
        data={vendorsData}
      />

      <ChangePasswordDialog
        userId={passwordUserId}
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      />
    </>
  );
};

export default Vendors;
