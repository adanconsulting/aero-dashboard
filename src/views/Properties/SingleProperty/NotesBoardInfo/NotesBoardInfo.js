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

const NotesBoardInfo = (props) => {
  const propertyId = props.match.params.id;
  const token = useSelector((state) => state.user.token);
  const { enqueueSnackbar } = useSnackbar();

  const [serverLoad, setServerLoad] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "textarea",
      name: "notes_for_property",
      label: "Notes for this Property",
      caption: "Internal Use Only",
    },
    {
      type: "textarea",
      name: "board_message",
      label: "Board Message",
    },
    {
      type: "datepicker",
      name: "recorded_date",
      label: "Recorded Date",
      value: null,
    },
    {
      type: "datepicker",
      name: "expiration_date",
      label: "Expiration Date",
      value: null,
    },
    {
      type: "submit",
      label: "Update Notes Board",
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
      setFormData((data) => mapFormValues(data, propertyData.notes_board_info));
      setServerLoad(true);
    }
  }, [propertyData]);

  const handleOnSubmit = async (values) => {
    const updatedData = {};
    updatedData.notes_board_info = values;
    const response = await updatePropertyAPI(token, propertyId, updatedData);
    if (!response.error) {
      PropertyActions.updateProperty(
        response.notes_board_info,
        `${propertyId}.notes_board_info`
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

export default NotesBoardInfo;
