import React from "react";
import DateFormat from "../../core/utils/DateFormat";

const columns = [
  {
    title: "Date",
    field: "time",
    defaultSort: "asc",
    render: (rowData) => <DateFormat date={rowData.time} />,
  },
  { title: "Status", field: "status" },
  { title: "Gross", field: "gross_amount", type: "currency" },
  { title: "Fee", field: "fee_amount", type: "currency" },
  {
    title: "Net",
    field: "net_amount",
    type: "currency",
    render: (rowData) => <b>${rowData.net_amount}</b>,
  },
];

export default columns;
