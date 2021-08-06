import React from "react";
import PropTypes from "prop-types";
import ReactTable from "core/ReactTable";
import DateFormat from "core/utils/DateFormat";

const columns = [
  {
    title: "Paid On",
    field: "paid_on",
    render: (rowData) => <DateFormat date={rowData.paid_on} />,
  },
  { title: "Note", field: "note" },
  { title: "Amount", field: "amount", type: "currency" },
];

const PaidDetail = (props) => {
  return (
    <>
      <ReactTable
        style={{ marginTop: 18 }}
        title="Paid History"
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

PaidDetail.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PaidDetail;
