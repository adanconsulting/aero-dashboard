import React, { useEffect } from "react";
import FileStorage from "core/FileStorage";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { createSelector } from "reselect";
import ReactGA from "react-ga";

import { filesAPI } from "api/property/files";
import FilesSkeleton from "core/Skeleton/FilesSkeleton";
import FileActions from "store/actions/file_actions";

const getFiles = createSelector(
  (state) => state.file,
  (_, propertyId) => propertyId,
  (file, propertyId) => file[propertyId]
);

const NewFiles = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const propertyId = props.match.params.id;

  const fileData = useSelector((state) => getFiles(state, propertyId));

  const loadFilesData = async () => {
    if (fileData === undefined) {
      const response = await filesAPI(propertyId);
      if (!response.error) {
        FileActions.laodFiles(propertyId, response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadFilesData();
  }, []);

  const onUploadComplete = (response) => {
    if (response.error) {
      console.error(response.error);
      enqueueSnackbar(response.error.message, { variant: "error" });
      return;
    }

    FileActions.addNewFile(propertyId, response);

    // Send GA events
    ReactGA.event({
      category: "Property",
      action: "File uploaded",
      value: 1,
    });
  };

  if (fileData === undefined) {
    return <FilesSkeleton />;
  }

  return (
    <FileStorage
      onComplete={onUploadComplete}
      propertyId={propertyId}
      type="files"
    />
  );
};

export default NewFiles;
