import React, { useEffect } from "react";
import PhotoGallery from "core/PhotoGallery";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import PhotosSkeleton from "core/Skeleton/PhotosSkeleton";
import { deletePhotosAPI, photosAPI } from "api/property/photos";
import PhotoActions from "store/actions/photo_actions";
import exportFiles from "core/utils/export_files";
import { KeyboardReturnOutlined } from "@material-ui/icons";

const getPhotos = createSelector(
  (state) => state.photo,
  (_, propertyId) => propertyId,
  (photo, propertyId) => photo[propertyId]
);

const Photos = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const propertyId = props.match.params.id;

  const photoData = useSelector((state) => getPhotos(state, propertyId));
  const userToken = useSelector((state) => state.user.token);

  const loadPhotosData = async () => {
    if (photoData === undefined) {
      const response = await photosAPI(propertyId);

      if (!response.error) {
        PhotoActions.loadPhotos(propertyId, response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadPhotosData();
  }, []);

  const onExport = async (data) => {
    if (!data.length) {
      enqueueSnackbar("Select one or more photos to export", {
        variant: "warning",
      });
      return;
    }

    await exportFiles("PhotoCollection.zip", data);
  };

  const onDelete = async (data) => {
    const { info, ids } = data;

    if (!ids.length) {
      enqueueSnackbar("Select one or more photos to delete", {
        variant: "warning",
      });
      return;
    }

    const response = await deletePhotosAPI(
      info.propertyId,
      info.albumId,
      userToken,
      ids
    );
    if (!response.error) {
      enqueueSnackbar("Photos deleted successfully", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  if (photoData === undefined) {
    return <PhotosSkeleton />;
  }

  return (
    <div>
      <PhotoGallery
        onExport={onExport}
        onDelete={onDelete}
        propertyId={propertyId}
      />
    </div>
  );
};

export default Photos;
