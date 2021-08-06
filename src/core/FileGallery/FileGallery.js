import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import Gallery from "./Gallery";
import Toolbar from "./Toolbar";

const getFiles = createSelector(
  (state) => state.file,
  (_, propertyId) => propertyId,
  (file, propertyId) => file[propertyId].files
);

const PhotoGallery = (props) => {
  const { propertyId } = props;

  const files = useSelector((state) => getFiles(state, propertyId));

  const onDeleteFiles = async (fileList) => {
    const ids = fileList.reduce((r, file) => {
      r.push(file.file_id);
      return r;
    }, []);

    if (props.onDelete) {
      await props.onDelete({
        propertyId: propertyId,
        ids: ids,
      });
    }
  };

  const onExportFiles = async (fileList) => {
    if (props.onExport) {
      await props.onExport(fileList);
    }
  };

  return (
    <>
      <Toolbar
        propertyId={propertyId}
        files={files}
        onExport={onExportFiles}
        onDelete={onDeleteFiles}
      />
      <Gallery files={files} propertyId={propertyId} />
    </>
  );
};

PhotoGallery.propTypes = {
  propertyId: PropTypes.string.isRequired,
  onExport: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PhotoGallery;
