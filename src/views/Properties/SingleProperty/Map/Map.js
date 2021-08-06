import React, { useEffect } from "react";
import GoogleMap from "core/GoogleMap/GoogleMap";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import PropertyActions from "store/actions/property_actions";
import { getSinglePropertyAPI } from "api/property/property";
import PropertySkeleton from "core/Skeleton/PropertySkeleton";

const getSingleProperty = createSelector(
  (state) => state.property.single,
  (_, propertyId) => propertyId,
  (property, propertyId) => property[propertyId]
);

const Map = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const propertyId = props.match.params.id;

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
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadSingleProperty();
  }, []);

  if (propertyData === undefined) {
    return <PropertySkeleton rows={10} />;
  }

  return (
    <GoogleMap
      center={{
        lat: propertyData.information.lat,
        lng: propertyData.information.lng,
      }}
      markers={[
        {
          lat: propertyData.information.lat,
          lng: propertyData.information.lng,
          title: propertyData.information.address,
          open: true,
        },
      ]}
    />
  );
};

export default Map;
