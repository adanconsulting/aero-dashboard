import React, { useState } from "react";

import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import GoogleMap from "core/GoogleMap/GoogleMap";
import ReactForm from "core/ReactForm";
import how_you_find_the_property_options from "constant/how_you_find_the_property_options";

import ReactGA from "react-ga";
import exifr from "exifr";
import { getLocationAddress } from "core/GoogleMap/utils/utils";
import PhotoPicker from "views/shared/PhotoPicker";
import { newPropertyAPI } from "api/property/property";

import PropertyActions from "store/actions/property_actions";
import { mapFormValues } from "core/ReactForm/components/utils";

const NewProperty = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const userToken = useSelector((state) => state.user.token);

  const [data, setData] = useState([
    {
      type: "select",
      name: "how_you_find_the_property",
      label: "How did you find this property",
      value: "i_own",
      options: how_you_find_the_property_options,
    },
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
      schema: {
        city: {
          presence: { allowEmpty: false, message: "is required" },
        },
      },
    },
    {
      type: "textfield",
      name: "state",
      label: "State",
      schema: {
        state: {
          presence: { allowEmpty: false, message: "is required" },
        },
      },
    },
    {
      type: "textfield",
      subtype: "number",
      name: "zip",
      label: "Zip",
      schema: {
        zip: {
          presence: { allowEmpty: false, message: "is required" },
        },
      },
    },
    {
      type: "textfield",
      name: "country",
      label: "Country",
      schema: {
        country: {
          presence: { allowEmpty: false, message: "is required" },
        },
      },
    },
    {
      type: "textarea",
      name: "notes_for_property",
      label: "Notes for this Property",
      caption: "Internal Use Only",
    },
    {
      type: "hidden",
      name: "lat",
    },
    {
      type: "hidden",
      name: "lng",
    },
    {
      type: "submit",
      label: "Create new property",
    },
  ]);

  const handleOnSubmit = async (values) => {
    values.token = userToken;

    if (!values.lat || !values.lng) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: values.address }, async (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            const geometry = results[0].geometry;
            if (geometry) {
              values.lat = geometry.location.lat();
              values.lng = geometry.location.lng();
              await createNewProperty(values);
            } else {
              enqueueSnackbar(
                "It seems address is not correct, Try to search address in MAP",
                {
                  variant: "error",
                }
              );
            }
          } else {
            enqueueSnackbar("No location found", { variant: "warning" });
          }
        } else {
          if (status === "ZERO_RESULTS") {
            enqueueSnackbar(
              "It seems address is not correct, Try to search address in MAP",
              {
                variant: "error",
              }
            );
          } else {
            enqueueSnackbar("Geocoder failed due to: " + status, {
              variant: "error",
            });
          }

          console.log(status);
        }
      });
    } else {
      await createNewProperty(values);
    }
  };

  const createNewProperty = async (values) => {
    const response = await newPropertyAPI(values);
    if (!response.error) {
      PropertyActions.addNewProperty(response);

      // Send GA events
      ReactGA.event({
        category: "Property",
        action: "Created",
      });

      enqueueSnackbar("New Property created successfully", {
        variant: "success",
      });
      history.replace("/properties");
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  const onLocationPick = (location) => {
    const mapValues = {
      address: location.address,
      city: location.city,
      state: location.state,
      zip: location.zip,
      country: location.country,
      lat: location.lat,
      lng: location.lng,
    };

    setData((data) => mapFormValues(data, mapValues));
  };

  const handleFileChange = async ({
    target: {
      files: [file],
    },
  }) => {
    if (file && file.name) {
      try {
        const gps = await exifr.gps(file);
        geocodeLatLng(window.google.maps, gps);
      } catch (e) {
        enqueueSnackbar("There is no GPS data in this photo", {
          variant: "error",
        });
      }
    }
  };

  const geocodeLatLng = (maps, gps) => {
    const geocoder = new maps.Geocoder();
    const latlng = {
      lat: gps.latitude,
      lng: gps.longitude,
    };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const loc = getLocationAddress(results[0]);
          loc.lat = latlng.lat;
          loc.lng = latlng.lng;
          onLocationPick(loc);
        } else {
          enqueueSnackbar("No location found", { variant: "warning" });
        }
      } else {
        enqueueSnackbar("Geocoder failed due to: " + status, {
          variant: "error",
        });
        console.log(status);
      }
    });
  };

  return (
    <>
      <GoogleMap
        userCurrentLocation
        allowSearch
        onLocationPick={onLocationPick}
        style={{ height: "35vh" }}
        center={{
          lat: 37.778519,
          lng: -122.40564,
        }}
      />
      <div style={{ padding: 24, float: "right" }}>
        <PhotoPicker onChange={handleFileChange} />
      </div>
      <ReactForm
        style={{ padding: 24 }}
        data={data}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default NewProperty;
