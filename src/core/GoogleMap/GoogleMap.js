import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

import AppActions from "store/actions/app_actions";
import dark_map from "./components/dark_map";
import { getLocationAddress } from "./utils/utils";

const useStyles = makeStyles({
  "@global": {
    main: {
      padding: "0 !important",
    },
  },
});

const getSearchRef = createSelector(
  (state) => state.app,
  (app) => app.search.inputRef
);

const checkThemeMode = createSelector(
  (state) => state.app,
  (app) => app.theme.darkmode
);

const GoogleMap = (props) => {
  useStyles();
  const isDarkMode = useSelector(checkThemeMode);
  const searchRef = useSelector(getSearchRef);

  useEffect(() => {
    AppActions.setSearchVisibility(true);
    AppActions.setSearchPlaceholder("Search address...");

    return () => {
      AppActions.setSearchPlaceholder("Not available...");
      AppActions.setSearchVisibility(false);
    };
  }, []);

  const defaultMapOptions = (maps) => {
    return {
      streetViewControl: true,
      mapTypeControl: true,
      styles: isDarkMode ? dark_map : [],
    };
  };

  const displayMarkers = (map, maps, markers) => {
    markers.forEach((marker) => {
      const m = new maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map,
        title: marker.title,
      });
      const infoWindow = new maps.InfoWindow({
        content: `<h4 style="color: #000">${marker.title}</h4>`,
      });
      m.addListener("click", function () {
        infoWindow.open(map, m);
      });
      if (marker.open) {
        infoWindow.open(map, m);
      }
    });
  };

  const allowSearch = (map, maps) => {
    const searchBox = new maps.places.SearchBox(searchRef.current);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Send result back to user
      if (props.onLocationPick) {
        props.onLocationPick(getLocationAddress(places[0]));
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new maps.Size(71, 71),
          origin: new maps.Point(0, 0),
          anchor: new maps.Point(17, 34),
          scaledSize: new maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
          new maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };

  const pickLocation = (map, maps) => {
    let clickMarker = false;
    let currentLocation;

    map.addListener("click", function (event) {
      //Get the location that the user clicked.
      var clickedLocation = event.latLng;
      //If the marker hasn't been added.
      if (clickMarker === false) {
        //Create the marker.
        clickMarker = new maps.Marker({
          position: clickedLocation,
          map: map,
          draggable: true, //make it draggable
        });
        //Listen for drag events!
        maps.event.addListener(clickMarker, "dragend", function (event) {
          currentLocation = clickMarker.getPosition();
          geocodeLatLng(maps, currentLocation);
        });
      } else {
        //Marker has already been added, so just change its location.
        clickMarker.setPosition(clickedLocation);
      }
      //Get the marker's location.
      currentLocation = clickMarker.getPosition();
      geocodeLatLng(maps, currentLocation);
    });
  };

  const geocodeLatLng = (maps, location) => {
    const geocoder = new maps.Geocoder();
    const latlng = {
      lat: location.lat(),
      lng: location.lng(),
    };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          if (props.onLocationPick) {
            const loc = getLocationAddress(results[0]);
            loc.lat = latlng.lat;
            loc.lng = latlng.lng;
            props.onLocationPick(loc);
          }
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };

  const getUserCurrentLocation = (map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);
        },
        function () {
          map.getCenter();
        }
      );
    }
  };

  const handleApiLoaded = (map, maps) => {
    // Display Markers
    if (props.markers) {
      displayMarkers(map, maps, props.markers);
    }

    // Allow Search
    if (props.allowSearch) {
      allowSearch(map, maps);
    }

    // Pick location
    if (props.onLocationPick) {
      pickLocation(map, maps);
    }

    // user current location
    if (props.userCurrentLocation) {
      getUserCurrentLocation(map);
    }
  };

  return (
    <Grid container style={{ ...props.style }}>
      <GoogleMapReact
        options={defaultMapOptions}
        bootstrapURLKeys={{
          key: "AIzaSyBM_gmHHVAfpL3Kefk5FIQWb5kkE_gMSZk",
          libraries: "places",
        }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      ></GoogleMapReact>
    </Grid>
  );
};

GoogleMap.propTypes = {
  userCurrentLocation: PropTypes.bool,
  allowSearch: PropTypes.bool,
  onLocationPick: PropTypes.func,
  style: PropTypes.exact({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  markers: PropTypes.arrayOf(
    PropTypes.exact({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      title: PropTypes.string,
      open: PropTypes.bool,
    })
  ),
  center: PropTypes.exact({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

GoogleMap.defaultProps = {
  style: {
    width: "100%",
    height: "90vh",
  },
  zoom: 14,
  center: {
    lat: 37.778519,
    lng: -122.40564,
  },
};

export default GoogleMap;
