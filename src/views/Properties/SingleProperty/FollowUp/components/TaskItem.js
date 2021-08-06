import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useSnackbar } from "notistack";
import { changeFollowUpStatus } from "api/property/property";

import AppActions from "store/actions/app_actions";
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

const TaskItem = (props) => {
  const classes = useStyles();
  const [task, setTask] = useState(props.task);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  const enableTask = async () => {
    AppActions.loading(true, "Changing Follow up task status...");
    const taskObject = { ...task, is_active: true };
    const response = await changeFollowUpStatus(
      props.userToken,
      props.propertyId,
      taskObject
    );
    if (!response.error) {
      enqueueSnackbar("Follow up task is enabled", { variant: "success" });
      setTask(taskObject);
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }

    AppActions.loading(false, null);
  };

  const disableTask = async () => {
    AppActions.loading(true, "Changing Follow up task status...");
    const taskObject = { ...task, is_active: false };
    const response = await changeFollowUpStatus(
      props.userToken,
      props.propertyId,
      taskObject
    );
    if (!response.error) {
      enqueueSnackbar("Follow up task is disabled", { variant: "success" });
      setTask(taskObject);
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }

    AppActions.loading(false, null);
  };

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Remind On: <DateFormat date={task.remind_on} />
      </Typography>

      <Typography className={classes.note}>{task.note}</Typography>

      <CardActions className={classes.actions}>
        {task.is_active ? (
          <Button size="small" variant="contained" onClick={disableTask}>
            Disable
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={enableTask}
          >
            Enable
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TaskItem;
