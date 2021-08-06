import React from "react";
import DateFormat from "../../core/utils/DateFormat";

const columns = [
  { title: "Name", field: "name" },
  { title: "Address", field: "address" },
  { title: "Email", field: "email" },
  {
    title: "Created On",
    field: "created_on",
    render: (rowData) => <DateFormat date={rowData.created_on} />,
  },
  { title: "Earn", field: "earn", type: "currency" },
];

export default columns;
