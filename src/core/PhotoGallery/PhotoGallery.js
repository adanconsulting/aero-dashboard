import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import Gallery from "./Gallery";
import Toolbar from "./Toolbar";
import LightBox from "./LightBox";

const getSelectedAlbum = createSelector(
  (state) => state.photo,
  (_, propertyId) => propertyId,
  (photo, propertyId) => photo[propertyId].selectedAlbum
);

const getPhotos = createSelector(
  (state) => state.photo,
  (_, info) => info,
  (photo, info) => photo[info.propertyId][info.albumId]
);

const PhotoGallery = (props) => {
  const [showLightBox, setShowLightBox] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const selectedAlbum = useSelector((state) =>
    getSelectedAlbum(state, props.propertyId)
  );

  const info = {
    propertyId: props.propertyId,
    albumId: selectedAlbum,
  };

  const photos = useSelector((state) => getPhotos(state, info));

  const openLightBox = (index, _) => {
    setShowLightBox(true);
    setImageIndex(index);
  };

  const onDeletePhotos = async (photoList) => {
    const ids = photoList.reduce((r, photo) => {
      r.push(photo.photo_id);
      return r;
    }, []);

    if (props.onDelete) {
      await props.onDelete({
        info: info,
        ids: ids,
      });
    }
  };

  const onExportPhotos = async (photoList) => {
    if (props.onExport) {
      await props.onExport(photoList);
    }
  };

  return (
    <>
      <Toolbar
        info={info}
        photos={photos}
        onExport={onExportPhotos}
        onDelete={onDeletePhotos}
      />
      <Gallery onPhotoClick={openLightBox} photos={photos} info={info} />
      {showLightBox && (
        <LightBox
          photos={photos}
          currentIndex={imageIndex}
          onClose={() => setShowLightBox(false)}
        />
      )}
    </>
  );
};

PhotoGallery.propTypes = {
  propertyId: PropTypes.string.isRequired,
  onExport: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PhotoGallery;
