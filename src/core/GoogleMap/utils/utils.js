import { in_array } from "core/utils/array_util";

export const getLocationAddress = (place) => {
  const address_components = place.address_components;
  const location = {};
  // location.address = place.formatted_address;
  location.address = "";

  address_components.forEach((component) => {
    if (in_array(component.types, "locality")) {
      location.city = component.long_name;
    } else if (in_array(component.types, "administrative_area_level_1")) {
      location.state = component.long_name;
    } else if (in_array(component.types, "postal_code")) {
      location.zip = component.long_name;
    } else if (in_array(component.types, "country")) {
      location.country = component.long_name;
    } else if (in_array(component.types, "premise")) {
      location.address = component.long_name + ",";
    } else if (in_array(component.types, "street_number")) {
      location.address = " " + component.long_name;
    } else if (in_array(component.types, "route")) {
      location.address += " " + component.long_name + ",";
    } else if (in_array(component.types, "sublocality_level_2")) {
      location.address += " " + component.long_name;
    } else if (in_array(component.types, "sublocality_level_1")) {
      location.address += " " + component.long_name;
    }
  });

  location.address = location.address.replace(/,\s*$/, "");
  return location;
};
