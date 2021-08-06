import React from "react";
import PhotoAvatar from "./components/PhotoAvatar";
import FadeoutData from "./components/FadeoutData";
import DateFormat from "../../core/utils/DateFormat";

import how_you_find_the_property_options from "constant/how_you_find_the_property_options";
import property_type_options from "constant/property_type_options";
import property_status from "constant/property_status";

const columns = [
  {
    title: "Photo",
    field: "photo",
    render: (rowData) => <PhotoAvatar data={rowData} />,
    sorting: false,
  },
  {
    title: "Opportunity",
    field: "opportunity",
    render: (rowData) => {
      const opportunity = how_you_find_the_property_options.find(
        (option) => option.value === rowData.opportunity
      );

      let opportunityLabel = rowData.opportunity;

      if (opportunity) {
        opportunityLabel = opportunity.label;
      }

      return <span>{opportunityLabel}</span>;
    },
  },
  {
    title: "Property Type",
    field: "property_type",
    render: (rowData) => {
      const property_type = property_type_options.find(
        (option) => option.value === rowData.property_type
      );

      let propertyTypeLabel = rowData.property_type;

      if (property_type) {
        propertyTypeLabel = property_type.label;
      }

      return <FadeoutData data={propertyTypeLabel} basedOn={["Not Specify"]} />;
    },
  },
  { title: "Address", field: "address" },
  {
    title: "Status",
    field: "status",
    render: (rowData) => {
      const propertyStatus = property_status.find(
        (option) => option.value === rowData.status
      );

      return propertyStatus.label;
    },
  },
  {
    title: "Vendor",
    field: "vendor",
    render: (rowData) => (
      <FadeoutData data={rowData.vendor} basedOn={["Not Found", "Owner"]} />
    ),
  },
  {
    title: "Created On",
    field: "created_on",
    render: (rowData) => <DateFormat date={rowData.created_on} />,
  },
];

export default columns;
