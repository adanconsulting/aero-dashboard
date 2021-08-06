import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import property_status from "constant/property_status";

const StatusMenu = (props) => {
  return (
    <div>
      <Menu
        id="properties-status-menu"
        anchorEl={props.anchor}
        keepMounted
        open={Boolean(props.anchor)}
        onClose={props.onClose}
      >
        {property_status.map((status) => (
          <MenuItem
            key={status.value}
            onClick={() => props.onStatusChange(status.value)}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

StatusMenu.propTypes = {
  anchor: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default StatusMenu;
