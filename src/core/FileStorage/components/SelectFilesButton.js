import React from "react";
import PropTypes from "prop-types";

const SelectFilesButton = (props) => (
  <span className="selectFileButton">
    <input
      id="___SelectFileButton___"
      type="file"
      onChange={props.onChange}
      multiple={props.multiple}
      hidden
    />
    <span
      onClick={() => {
        global.document.getElementById("___SelectFileButton___").click();
      }}
    >
      {props.button}
    </span>
  </span>
);

SelectFilesButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  button: PropTypes.node,
  multiple: PropTypes.bool,
};

SelectFilesButton.defaultProps = {
  button: <button>Select Files</button>,
  multiple: true,
};

export default SelectFilesButton;
