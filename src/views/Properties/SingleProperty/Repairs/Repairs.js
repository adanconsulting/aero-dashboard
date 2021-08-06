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

const Repairs = (props) => {
  const propertyId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState([
    {
      type: "textfield",
      forceRender: true,
      name: "days_to_complete_repair",
      label: "Days to Complete Repairs",
      caption: "How many days it will take to repair",
    },
    {
      type: "currency",
      forceRender: true,
      name: "roof_repairs",
      label: "Roof Repairs",
    },
    {
      type: "currency",
      name: "siding_repairs",
      label: "Siding Repairs",
    },
    {
      type: "currency",
      name: "windows_repairs",
      label: "Windows Repairs",
    },
    {
      type: "currency",
      name: "gutters_repairs",
      label: "Gutters Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "landscaping_repairs",
      label: "Landscaping Repairs",
    },
    {
      type: "textfielcurrencyd",
      forceRender: true,
      name: "exterior_paint_repairs",
      label: "Exterior Paint Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "trash_out_repairs",
      label: "Trash Out Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "carpet_repairs",
      label: "Carpet Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "vinyl_repairs",
      label: "Vinyl Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "interior_paint_repairs",
      label: "Interior Paint Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "wall_prep_repairs",
      label: "Wall Prep Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "appliances_repairs",
      label: "Appliances Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "plumbing_repairs",
      label: "Plumbing Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "electrical_repairs",
      label: "Electrical Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "doors_repairs",
      label: "Doors Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "misc_one_repairs",
      label: "Misc One Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "misc_two_repairs",
      label: "Misc Two Repairs",
    },
    {
      type: "currency",
      forceRender: true,
      name: "misc_three_repairs",
      label: "Misc Three Repairs",
    },
    {
      type: "currency",
      name: "repair_totals",
      label: "Repair Totals",
      readOnly: true,
      dependency: {
        on: [
          "roof_repairs",
          "siding_repairs",
          "windows_repairs",
          "gutters_repairs",
          "landscaping_repairs",
          "exterior_paint_repairs",
          "trash_out_repairs",
          "carpet_repairs",
          "vinyl_repairs",
          "interior_paint_repairs",
          "wall_prep_repairs",
          "appliances_repairs",
          "plumbing_repairs",
          "electrical_repairs",
          "doors_repairs",
          "misc_one_repairs",
          "misc_two_repairs",
          "misc_three_repairs",
        ],
        callback: (data) => {
          let result = 0;
          data.forEach((item) => {
            result += parseFloat(item.value) || 0;
          });

          return result;
        },
      },
    },
    {
      type: "submit",
      label: "Update Repairs",
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
      setFormData((data) => mapFormValues(data, propertyData.repairs));
    }
  }, [propertyData]);

  const handleOnSubmit = async (values) => {
    const updatedData = {};
    updatedData.repairs = values;
    const response = await updatePropertyAPI(token, propertyId, updatedData);
    if (!response.error) {
      PropertyActions.updateProperty(response.repairs, `${propertyId}.repairs`);
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
      <ReactForm data={formData} onSubmit={handleOnSubmit} />
    </>
  );
};

export default Repairs;
