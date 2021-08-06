import React from "react";
import PropTypes from "prop-types";
import ReactTable from "core/ReactTable";

const columns = [
  { title: "Address", field: "address" },
  { title: "Type", field: "type" },
  { title: "Payment", field: "payment", type: "currency" },
];

const EarningDetail = (props) => {
  return (
    <>
      <ReactTable
        style={{ marginTop: 18 }}
        title={props.data[0].name}
        options={{
          selection: false,
          actionsColumnIndex: -1,
        }}
        columns={columns}
        data={props.data}
      />
    </>
  );
};

EarningDetail.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EarningDetail;
