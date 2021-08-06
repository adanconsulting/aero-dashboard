import React from "react";
import FileStorage from "core/FileStorage";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { createSelector } from "reselect";
import ReactGA from "react-ga";

import { photosAPI } from "api/property/photos";

import PhotosSkeleton from "core/Skeleton/PhotosSkeleton";
import PhotoActions from "store/actions/photo_actions";

const getPhotos = createSelector(
  (state) => state.photo,
  (_, propertyId) => propertyId,
  (photo, propertyId) => photo[propertyId]
);

const NewPhotos = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const propertyId = props.match.params.id;
  const albumId = props.match.params.albumId;
  let albumName = "";
  let newCollection = false;

  if (props.location.state) {
    albumName = props.location.state.collectionName;
    newCollection = props.location.state.newCollection;
  }

  const photoData = useSelector((state) => getPhotos(state, propertyId));

  const loadPhotosData = async (forceLoad = false) => {
    if (photoData === undefined || forceLoad) {
      const response = await photosAPI(propertyId);

      if (!response.error) {
        PhotoActions.loadPhotos(propertyId, response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  React.useEffect(() => {
    loadPhotosData();
  }, []);

  const onUploadComplete = (response) => {
    if (response.error) {
      console.error(response.error);
      enqueueSnackbar(response.error.message, { variant: "error" });
      return;
    }

    if (newCollection) {
      loadPhotosData(true);
    } else {
      PhotoActions.addNewPhotos(propertyId, albumId, response);

      // Send GA events
      ReactGA.event({
        category: "Property",
        action: "Photo uploaded",
        value: 1,
      });
    }
  };

  if (photoData === undefined) {
    return <PhotosSkeleton />;
  }

  return (
    <FileStorage
      onComplete={onUploadComplete}
      propertyId={propertyId}
      albumId={albumId}
      albumName={albumName || ""}
      type="photos"
    />
  );
};

export default NewPhotos;
