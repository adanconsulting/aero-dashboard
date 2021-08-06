import React from "react";
import PropTypes from "prop-types";
import imageCompression from "browser-image-compression";

const SelectImagesButton = (props) => {
  const handleFileChange = async (event) => {
    props.showProgress();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    const files = event.target.files;
    const compressImages = [];

    for (const file of files) {
      const output = await imageCompression(file, options);
      compressImages.push(output);
    }

    props.hideProgress();

    props.onChange(compressImages);
  };

  return (
    <span className="selectFileButton">
      <input
        id="___SelectImagesButton___"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple={props.multiple}
        hidden
      />
      <span
        onClick={() => {
          global.document.getElementById("___SelectImagesButton___").click();
        }}
      >
        {props.button}
      </span>
    </span>
  );
};

SelectImagesButton.propTypes = {
  showProgress: PropTypes.func.isRequired,
  hideProgress: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  button: PropTypes.node,
  multiple: PropTypes.bool,
};

SelectImagesButton.defaultProps = {
  button: <button>Select Images</button>,
  multiple: true,
};

export default SelectImagesButton;
