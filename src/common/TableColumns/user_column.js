import React from "react";
import DateFormat from "../../core/utils/DateFormat";

const columns = [
  { title: "Username", field: "username" },
  { title: "Address", field: "address" },
  { title: "Type", field: "type" },
  {
    title: "Affiliate",
    field: "affiliate",
  },
  {
    title: "Status",
    field: "status",
  },
  {
    title: "Created On",
    field: "created_on",
    render: (rowData) => <DateFormat date={rowData.created_on} />,
  },
  { title: "", field: "name", searchable: true, hidden: true },
  { title: "", field: "email", searchable: true, hidden: true },
  { title: "", field: "phone", searchable: true, hidden: true },
];

export default columns;
