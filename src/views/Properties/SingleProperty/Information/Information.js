import React, { useState, useEffect } from "react";
import HeadingBar from "../shared/HeadingBar";
import ReactForm from "core/ReactForm";

import how_you_find_the_property_options from "constant/how_you_find_the_property_options";
import property_type_options from "constant/property_type_options";
import property_status from "constant/property_status";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import PropertyActions from "store/actions/property_actions";
import { getSinglePropertyAPI, updatePropertyAPI } from "api/property/property";
import PropertySkeleton from "core/Skeleton/PropertySkeleton";
import { mapFormValues } from "core/ReactForm/components/utils";
import updatePropertyDashboard from "../common/update_property_dashboard";

const getSingleProperty = createSelector(
  (state) => state.property.single,
  (_, propertyId) => propertyId,
  (property, propertyId) => property[propertyId]
);

const Information = (props) => {
  const propertyId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [serverLoad, setServerLoad] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "textfield",
      name: "address",
      label: "Address",
      schema: {
        address: {
          presence: { allowEmpty: false, message: "is required" },
        },
      },
    },
    {
      type: "textfield",
      name: "city",
      label: "City",
    },
    {
      type: "textfield",
      name: "state",
      label: "State",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "zip",
      label: "Zip",
    },
    {
      type: "textfield",
      name: "country",
      label: "Country",
    },
    {
      type: "select",
      name: "how_you_find_the_property",
      label: "How did you find this property",
      value: "i_own",
      options: how_you_find_the_property_options,
    },
    {
      type: "select",
      name: "property_type",
      label: "Property Type",
      value: "not_specify",
      options: property_type_options,
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: "new",
      options: property_status,
    },
    {
      type: "textfield",
      name: "lock_box",
      label: "Lock Box",
    },
    {
      type: "textfield",
      name: "arv",
      label: "ARV",
    },
    {
      type: "select",
      name: "vacant",
      label: "Vacant",
      value: "unknown",
      options: [
        {
          value: "no",
          label: "No",
        },
        {
          value: "yes",
          label: "Yes",
        },
        {
          value: "unknown",
          label: "Unknown",
        },
      ],
    },
    {
      type: "select",
      name: "secured",
      label: "Secured",
      value: "unknown",
      options: [
        {
          value: "no",
          label: "No",
        },
        {
          value: "yes",
          label: "Yes",
        },
        {
          value: "unknown",
          label: "Unknown",
        },
      ],
    },
    {
      type: "submit",
      label: "Update Information",
    },
  ]);

  const propertyData = useSelector((state) =>
    getSingleProperty(state, propertyId)
  );

  const loadSingleProperty = async () => {
    if (propertyData === undefined) {
      const response = await getSinglePropertyAPI(propertyId);
      if (!response.error) {
        PropertyActions.loadSingleProperty(response.id, response);
      } else {
        console.log(response);
      }
    }
  };

  useEffect(() => {
    loadSingleProperty();
  }, []);

  useEffect(() => {
    if (propertyData !== undefined) {
      setFormData((data) => mapFormValues(data, propertyData.information));
      setServerLoad(true);
    }
  }, [propertyData]);

  const handleOnSubmit = async (values) => {
    const updatedData = {};
    updatedData.information = values;
    const response = await updatePropertyAPI(token, propertyId, updatedData);
    if (!response.error) {
      PropertyActions.updateProperty(
        response.information,
        `${propertyId}.information`
      );
      updatePropertyDashboard(token);
      enqueueSnackbar("Property updated successfully", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  if (propertyData === undefined) {
    return <PropertySkeleton rows={10} />;
  }

  return (
    <>
      <HeadingBar title={propertyData.information.address} />
      <ReactForm
        data={formData}
        serverLoad={serverLoad}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default Information;
