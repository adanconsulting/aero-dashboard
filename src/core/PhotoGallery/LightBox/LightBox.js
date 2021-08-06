import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactLightBox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import DateFormat from "core/utils/DateFormat";

const LightBox = (props) => {
  const { currentIndex, onClose, photos } = props;
  const [imageIndex, setImageIndex] = useState(currentIndex);

  return (
    <ReactLightBox
      imageTitle={photos[imageIndex].name}
      imageCaption={<DateFormat date={photos[imageIndex].created_on} />}
      mainSrc={photos[imageIndex].url}
      nextSrc={photos[(imageIndex + 1) % photos.length].url}
      prevSrc={photos[(imageIndex + photos.length - 1) % photos.length].url}
      onCloseRequest={onClose}
      onMovePrevRequest={() =>
        setImageIndex((imageIndex + photos.length - 1) % photos.length)
      }
      onMoveNextRequest={() => setImageIndex((imageIndex + 1) % photos.length)}
    />
  );
};

LightBox.propTypes = {
  photos: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LightBox;
