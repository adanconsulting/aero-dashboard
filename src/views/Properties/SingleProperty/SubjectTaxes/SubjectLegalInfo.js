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

const SubjectLegalInfo = (props) => {
  const propertyId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [serverLoad, setServerLoad] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "textfield",
      subtype: "number",
      name: "parcel_pin_number",
      label: "Parcel/Pin Number",
    },
    {
      type: "textarea",
      name: "legal_description",
      label: "Legal Description",
    },
    {
      type: "select",
      name: "taxes_current",
      label: "Taxes Current",
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
      type: "currency",
      name: "delinquent_taxes",
      label: "Delinquent Taxes",
    },
    {
      type: "currency",
      name: "last_sale_price",
      label: "Last Sale Price",
    },
    {
      type: "datepicker",
      name: "last_dale_date",
      label: "Last Sale Date",
      value: null,
    },
    {
      type: "currency",
      name: "mortgage_balance",
      label: "Mortgage Balance",
    },
    {
      type: "select",
      name: "hoa",
      label: "HOA",
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
      type: "currency",
      name: "hoa_price",
      label: "HOA Price",
    },
    {
      type: "currency",
      name: "hoa_initation_fee",
      label: "HOA initation Fee",
    },
    {
      type: "select",
      name: "hoa_type",
      label: "HOA Type",
      value: "annually",
      options: [
        {
          value: "annually",
          label: "Annually",
        },
        {
          value: "monthly",
          label: "Monthly",
        },
      ],
    },
    {
      type: "currency",
      name: "hoa_balance_due",
      label: "HOA Balance Due",
    },
    {
      type: "select",
      name: "liens",
      label: "Liens",
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
      type: "currency",
      name: "liens_price",
      label: "Liens Price",
    },
    {
      type: "submit",
      label: "Update Subject Legal Info",
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
          mapFormValues(data, propertyData.subject_taxes.legal_info)
        );
        setServerLoad(true);
      }
    }
  }, [propertyData]);

  const handleOnSubmit = async (values) => {
    const updatedData = {
      subject_taxes: {
        legal_info: values,
      },
    };
    const response = await updatePropertyAPI(token, propertyId, updatedData);
    if (!response.error) {
      PropertyActions.updateProperty(
        response.subject_taxes.legal_info,
        `${propertyId}.subject_taxes.legal_info`
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
        serverLoad={serverLoad}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default SubjectLegalInfo;
