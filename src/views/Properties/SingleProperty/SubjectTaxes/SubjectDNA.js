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

const SubjectDNA = (props) => {
  const propertyId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [serverLoad, setServerLoad] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "select",
      name: "condition",
      label: "Condition",
      value: "not_specify",
      options: [
        {
          value: "not_specify",
          label: "Not Specify",
        },
        {
          value: "excellent",
          label: "Excellent",
        },
        {
          value: "good",
          label: "Good",
        },
        {
          value: "average",
          label: "Average",
        },
        {
          value: "fair",
          label: "Fair",
        },
        {
          value: "poor",
          label: "Poor",
        },
      ],
    },
    {
      type: "textfield",
      subtype: "number",
      name: "square_footage",
      label: "Square Footage",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "square_footage_main",
      label: "Square Footage Main:",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "square_footage_upper",
      label: "Square Footage Upper",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "lot_size",
      label: "Lot Size",
    },
    {
      type: "select",
      name: "lot_units",
      label: "Lot Units",
      value: "square_feet",
      options: [
        {
          value: "square_feet",
          label: "Square Feet",
        },
        {
          value: "acres",
          label: "Acres",
        },
      ],
    },
    {
      type: "textfield",
      subtype: "number",
      name: "year_built",
      label: "Year built",
      caption: "Build year e.g 1992",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "room_count",
      label: "Room Count",
    },
    {
      type: "textfield",
      subtype: "number",
      name: "bedroom_count",
      label: "Bedroom Count",
    },
    {
      type: "textfield",
      subtype: "number",
      forceRender: true,
      name: "bathroom_full_count",
      label: "Bathroom Full Count",
    },
    {
      type: "textfield",
      subtype: "number",
      forceRender: true,
      name: "bathroom_half_count",
      label: "Bathroom Half Count",
    },
    {
      type: "textfield",
      subtype: "number",
      readOnly: true,
      name: "total_bathroom",
      label: "Total Bathroom",
      dependency: {
        on: ["bathroom_full_count", "bathroom_half_count"],
        callback: (data) => {
          let result = 0;
          data.forEach((item) => {
            if (item.name === "bathroom_half_count") {
              result += parseFloat(item.value) / 2 || 0;
            } else {
              result += parseFloat(item.value) || 0;
            }
          });

          return result;
        },
      },
    },
    {
      type: "textfield",
      subtype: "number",
      name: "basement_sqft",
      label: "Basement SqFt",
    },
    {
      type: "select",
      name: "basement_finished",
      label: "Basement Finished",
      value: "unknown",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "finished",
          label: "Finished",
        },
        {
          value: "unfinished",
          label: "Unfinished",
        },
        {
          value: "unknown",
          label: "Unknown",
        },
        {
          value: "na",
          label: "N/A",
        },
        {
          value: "full",
          label: "Full",
        },
        {
          value: "partial",
          label: "Partial",
        },
        {
          value: "full_finished",
          label: "Full Finished",
        },
        {
          value: "partial_finished",
          label: "Partial Finished",
        },
        {
          value: "walk_out",
          label: "Walk Out",
        },
        {
          value: "day_light",
          label: "Day Light",
        },
        {
          value: "cellar",
          label: "Cellar",
        },
      ],
    },
    {
      type: "submit",
      label: "Update Subject DNA",
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
          mapFormValues(data, propertyData.subject_taxes.dna)
        );
        setServerLoad(true);
      }
    }
  }, [propertyData]);

  const handleOnSubmit = async (values) => {
    const updatedData = {
      subject_taxes: {
        dna: values,
      },
    };
    const response = await updatePropertyAPI(token, propertyId, updatedData);
    if (!response.error) {
      PropertyActions.updateProperty(
        response.subject_taxes.dna,
        `${propertyId}.subject_taxes.dna`
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

export default SubjectDNA;
