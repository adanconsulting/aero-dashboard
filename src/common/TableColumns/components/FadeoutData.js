import React from "react";
import PropTypes from "prop-types";
import { in_array } from "core/utils/array_util";

const FadeoutData = (props) => {
  const { basedOn, data } = props;

  if (in_array(basedOn, data)) {
    return (
      <span style={{ color: "#999999" }}>
        <i>{data}</i>
      </span>
    );
  }

  return <span>{data}</span>;
};

FadeoutData.propTypes = {
  data: PropTypes.string.isRequired,
  basedOn: PropTypes.array.isRequired,
};

export default FadeoutData;
