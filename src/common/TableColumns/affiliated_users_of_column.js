import { formatPhoneNumber } from "core/utils/format_util";
import React from "react";
import DateFormat from "../../core/utils/DateFormat";

const columns = [
  { title: "Name", field: "name" },
  { title: "Address", field: "address" },
  { title: "Email", field: "email" },
  { title: "Username", field: "username" },
  {
    title: "Phone",
    field: "phone",
    render: (rowData) => <span>{formatPhoneNumber(rowData.phone)}</span>,
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
];

export default columns;
