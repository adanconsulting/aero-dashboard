import React, { useEffect } from "react";
import GoogleMap from "core/GoogleMap/GoogleMap";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import MapActions from "store/actions/map_actions";
import mapAPI from "api/property/map";
import PropertySkeleton from "core/Skeleton/PropertySkeleton";

const getPropertiesMap = createSelector(
  (state) => state.map,
  (map) => map.all
);

const Maps = () => {
  const { enqueueSnackbar } = useSnackbar();

  const mapData = useSelector(getPropertiesMap);
  const token = useSelector((state) => state.user.token);

  const loadPropertiesMap = async () => {
    if (mapData === undefined) {
      const response = await mapAPI(token);
      if (!response.error) {
        MapActions.loadPropertiesMap(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadPropertiesMap();
  }, []);

  if (mapData === undefined) {
    return <PropertySkeleton rows={10} />;
  }

  return (
    <GoogleMap
      center={{
        lat: mapData[0].lat,
        lng: mapData[0].lng,
      }}
      markers={mapData}
    />
  );
};

export default Maps;
