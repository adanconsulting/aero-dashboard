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

const SubjectPricing = (props) => {
  const propertyId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [serverLoad, setServerLoad] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "currency",
      name: "current_list_price",
      label: "Current List Price",
    },
    {
      type: "currency",
      name: "minimum_to_sell",
      label: "Minimum to Sell",
    },
    {
      type: "currency",
      name: "rent_low",
      label: "Rent Low",
    },
    {
      type: "currency",
      name: "rent_high",
      label: "Rent High",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "days_to_rent",
      label: "Days to Rent",
    },
    {
      type: "currency",
      name: "appraisal_amount:",
      label: "Appraisal Amount",
    },
    {
      type: "datepicker",
      name: "appraisal_date",
      label: "Appraisal Date",
      value: null,
    },
    {
      type: "currency",
      name: "bpo_amount",
      label: "BPO Amount",
    },
    {
      type: "datepicker",
      name: "bpo_date",
      label: "BPO Date",
      value: null,
    },
    {
      type: "currency",
      name: "zestimate_Amount",
      label: "Zestimate Amount",
    },
    {
      type: "datepicker",
      name: "zestimate_date",
      label: "Zestimate Date",
      value: null,
    },
    {
      type: "submit",
      label: "Update Subject Pricing",
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
          mapFormValues(data, propertyData.subject_taxes.pricing)
        );
        setServerLoad(true);
      }
    }
  }, [propertyData]);

  const handleOnSubmit = async (values) => {
    const updatedData = {
      subject_taxes: {
        pricing: values,
      },
    };
    const response = await updatePropertyAPI(token, propertyId, updatedData);
    if (!response.error) {
      PropertyActions.updateProperty(
        response.subject_taxes.pricing,
        `${propertyId}.subject_taxes.pricing`
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

export default SubjectPricing;
