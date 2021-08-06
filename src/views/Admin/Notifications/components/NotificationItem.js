import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DateFormat from "core/utils/DateFormat";

const useStyles = makeStyles({
  root: {
    padding: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 14,
  },
  note: {
    marginBottom: 12,
  },
  actions: {
    float: "right",
  },
});

const NotificationItem = ({ notification, onUse }) => {
  const classes = useStyles();
  const bgColor = notification.priority === "blue" ? "#f5fbfe" : "bisque";

  return (
    <Card className={classes.root} style={{ backgroundColor: bgColor }}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Created On: <DateFormat date={notification.created_on} />
      </Typography>

      <Typography className={classes.note}>{notification.title}</Typography>
      <Typography className={classes.note} color="textSecondary">
        {notification.message}
      </Typography>

      <CardActions className={classes.actions}>
        <Button
          size="small"
          color="primary"
          onClick={() => onUse(notification)}
        >
          Use it
        </Button>
      </CardActions>
    </Card>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  onUse: PropTypes.func.isRequired,
};

export default NotificationItem;
