import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

const FieldLayout = (props) => {
  const { input } = props;
  return (
    <Grid container alignItems="center" key={input.name}>
      <Hidden smDown>
        <Grid item sm={4}>
          <Typography variant="h6">{input.label}</Typography>
          {input.caption && (
            <Typography variant="caption" color="textSecondary">
              {input.caption}
            </Typography>
          )}
        </Grid>
      </Hidden>
      <Grid item xs>
        {props.children}
      </Grid>
    </Grid>
  );
};

FieldLayout.propTypes = {
  input: PropTypes.object.isRequired,
};

export default FieldLayout;
