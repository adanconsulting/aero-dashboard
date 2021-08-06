import React, { useEffect, useState, useRef } from "react";
import ReactTable from "core/ReactTable";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import properties_column from "common/TableColumns/properties_column";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import {
  deletePropertiesAPI,
  loadAllPropertiesAPI,
  changePropertiesStatusAPI,
} from "api/property/property";
import PropertyActions from "store/actions/property_actions";
import TableSkeleton from "core/Skeleton/TableSkeleton";
import StatusMenu from "./components/StatusMenu";
import AppActions from "store/actions/app_actions";

const getAllProperties = createSelector(
  (state) => state.property,
  (property) => property.all
);

const Properties = () => {
  const history = useHistory();

  const propertiesData = useSelector(getAllProperties);
  const userToken = useSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const propertyIds = useRef();

  const { enqueueSnackbar } = useSnackbar();

  const loadAllProperties = async () => {
    if (!propertiesData.length) {
      setLoading(true);
      const response = await loadAllPropertiesAPI(userToken);
      setLoading(false);
      if (!response.error) {
        PropertyActions.loadAllProperties(response);
      } else {
        console.log(response);
      }
    }
  };

  useEffect(() => {
    loadAllProperties();
  }, []);

  const deleteProperties = async (rowIds) => {
    const response = await deletePropertiesAPI(userToken, rowIds);
    if (!response.error) {
      PropertyActions.deleteProperties(rowIds);
      enqueueSnackbar("Properties deleted successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  const onStatusChange = async (status) => {
    setStatusMenuAnchor(null);
    AppActions.loading(true, "Changing properties status, Processing...");
    const response = await changePropertiesStatusAPI(
      userToken,
      propertyIds.current,
      status
    );
    propertyIds.current = null;
    if (!response.error) {
      enqueueSnackbar("Properties status changed successfully", {
        variant: "success",
      });
      AppActions.loading(true, "Loading new status in property dashboard...");
      try {
        const properties = await loadAllPropertiesAPI(userToken);
        if (!properties.error) {
          PropertyActions.loadAllProperties(properties);
        } else {
          console.log(properties.error);
        }
      } catch (err) {
        AppActions.loading(false, null);
        enqueueSnackbar(err.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }

    AppActions.loading(false, null);
  };

  if (loading) {
    return <TableSkeleton cols={8} rows={8} />;
  }

  return (
    <>
      <ReactTable
        title="Properties"
        filtering={["status", "vendor"]}
        onDelete={deleteProperties}
        actions={[
          {
            tooltip: "Change Status",
            icon: AccountBalanceIcon,
            onClick: (evt, data) => {
              const rowsIds = data.reduce((r, row) => {
                r.push(row.id);
                return r;
              }, []);
              propertyIds.current = rowsIds;
              setStatusMenuAnchor(evt.currentTarget);
            },
          },
          {
            tooltip: "Add",
            icon: AddBoxIcon,
            isFreeAction: true,
            onClick: (evt, data) => {
              history.push("/property/new");
            },
          },
          {
            icon: EditIcon,
            tooltip: "View/Edit",
            position: "row",
            onClick: (event, rowData) =>
              history.push(`/property/information/${rowData.id}`),
          },
        ]}
        columns={properties_column}
        data={propertiesData}
      />

      <StatusMenu
        anchor={statusMenuAnchor}
        onClose={() => setStatusMenuAnchor(null)}
        onStatusChange={onStatusChange}
      />
    </>
  );
};

export default Properties;
