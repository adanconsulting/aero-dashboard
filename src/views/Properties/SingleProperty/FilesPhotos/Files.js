import React, { useEffect } from "react";
import FileGallery from "core/FileGallery";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import FilesSkeleton from "core/Skeleton/FilesSkeleton";
import { filesAPI, deleteFilesAPI } from "api/property/files";
import FileActions from "store/actions/file_actions";
import exportFiles from "core/utils/export_files";

const getFiles = createSelector(
  (state) => state.file,
  (_, propertyId) => propertyId,
  (file, propertyId) => file[propertyId]
);

const Files = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const propertyId = props.match.params.id;

  const fileData = useSelector((state) => getFiles(state, propertyId));
  const userToken = useSelector((state) => state.user.token);

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

  const onExport = async (data) => {
    if (!data.length) {
      enqueueSnackbar("Select one or more files to export", {
        variant: "warning",
      });
      return;
    }

    await exportFiles("FileCollection.zip", data);
  };

  const onDelete = async (data) => {
    const { propertyId, ids } = data;

    if (!ids.length) {
      enqueueSnackbar("Select one or more files to delete", {
        variant: "warning",
      });
      return;
    }

    const response = await deleteFilesAPI(propertyId, userToken, ids);
    if (!response.error) {
      enqueueSnackbar("Files deleted successfully", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
  };

  if (fileData === undefined) {
    return <FilesSkeleton />;
  }

  return (
    <div>
      <FileGallery
        onExport={onExport}
        onDelete={onDelete}
        propertyId={propertyId}
      />
    </div>
  );
};

export default Files;
