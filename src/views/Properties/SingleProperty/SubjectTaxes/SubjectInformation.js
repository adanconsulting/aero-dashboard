import React, { useState, useEffect } from "react";
import HeadingBar from "../shared/HeadingBar";
import ReactForm from "core/ReactForm";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import PropertyActions from "store/actions/property_actions";
import { getSinglePropertyAPI, updatePropertyAPI } from "api/property/property";
import PropertySkeleton from "core/Skeleton/PropertySkeleton";
import { mapFormValues } from "core/ReactForm/components/utils";

const getSingleProperty = createSelector(
  (state) => state.property.single,
  (_, propertyId) => propertyId,
  (property, propertyId) => property[propertyId]
);

const SubjectInformation = (props) => {
  const propertyId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [serverLaod, setServerLoad] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "select",
      name: "occupancy",
      label: "Occupancy",
      value: "unknown",
      options: [
        {
          value: "vacant",
          label: "Vacant",
        },
        {
          value: "tenant",
          label: "Tenant",
        },
        {
          value: "owner",
          label: "Owner",
        },
        {
          value: "unknown",
          label: "Unknown",
        },
        {
          value: "occupied_unknown",
          label: "Occupied Unknown",
        },
        {
          value: "occupied_tenant",
          label: "Occupied Tenant",
        },
        {
          value: "occupied_owner",
          label: "Occupied Owner",
        },
      ],
    },
    {
      type: "textfield",
      name: "occupant_first_name",
      label: "Occupant First Name",
    },
    {
      type: "textfield",
      name: "occupant_last_name",
      label: "Occupant Last Name",
    },
    {
      type: "phonenumber",
      name: "occupant_phone",
      label: "Occupant Phone",
    },
    {
      type: "textfield",
      name: "occupant_email",
      label: "Occupant Email",
      schema: {
        occupant_email: {
          email: true,
        },
      },
    },
    {
      type: "textfield",
      name: "occupant_mailing_address",
      label: "Occupant Mailing Address",
    },
    {
      type: "submit",
      label: "Update Subject Information",
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
      if (propertyData.subject_taxes !== undefined) {
        setFormData((data) =>
          mapFormValues(data, propertyData.subject_taxes.information)
        );
        setServerLoad(true);
      }
    }
  }, [propertyData]);

  const handleOnSubmit = async (values) => {
    const updatedData = {
      subject_taxes: {
        information: values,
      },
    };
    const response = await updatePropertyAPI(token, propertyId, updatedData);
    if (!response.error) {
      PropertyActions.updateProperty(
        response.subject_taxes.information,
        `${propertyId}.subject_taxes.information`
      );
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
        serverLoad={serverLaod}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default SubjectInformation;
