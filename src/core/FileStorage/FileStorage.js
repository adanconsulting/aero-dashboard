import React from "react";
import PropTypes from "prop-types";
import FileStorageMain from "./components/FileStorageMain";
import UserTour from "./components/UserTour";

import { useSelector } from "react-redux";

const firstTimeUserTour = () => {
  const tour = localStorage.getItem("FILE_STORAGE_tour");

  if (tour === null) {
    return true;
  }

  return tour === "false" ? false : true;
};

const FileStorage = (props) => {
  const responseList = React.useRef([]);
  const [tourDialog, openTourDialog] = React.useState(firstTimeUserTour);

  const userToken = useSelector((state) => state.user.token);

  let CLOUD_URL;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    CLOUD_URL =
      props.type === "photos"
        ? "http://localhost:5000/storage/photos"
        : "http://localhost:5000/storage/files";
  } else {
    CLOUD_URL =
      props.type === "photos"
        ? "https://api-dot-areoland.appspot.com/storage/photos"
        : "https://api-dot-areoland.appspot.com/storage/files";
  }

  const cloudData = {
    url: CLOUD_URL,
    propertyId: props.propertyId,
    albumName: props.albumName,
  };

  if (props.albumId) {
    cloudData.albumId = props.albumId;
  }

  const handleWhenComplete = (response) => {
    const photoExist = responseList.current.find((photo) => {
      if (props.type === "photos") {
        return photo.photo_id === response.photo_id;
      } else {
        return photo.file_id === response.file_id;
      }
    });
    if (!photoExist) {
      responseList.current.push(response);
      props.onComplete(response);
    }
  };

  return (
    <>
      <FileStorageMain
        cloudData={cloudData}
        onDownloadComplete={handleWhenComplete}
        type={props.type}
        userToken={userToken}
      />
      <UserTour open={tourDialog} onClose={() => openTourDialog(false)} />
    </>
  );
};

FileStorage.propTypes = {
  propertyId: PropTypes.string.isRequired,
  albumId: PropTypes.string,
  albumName: PropTypes.string,
  type: PropTypes.oneOf(["photos", "files"]).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default FileStorage;
