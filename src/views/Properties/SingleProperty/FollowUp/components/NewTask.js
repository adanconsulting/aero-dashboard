import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  TextField,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { addNewFollowUpTaskAPI } from "api/property/property";
import LoadingButton from "core/Components/LoadingButton";
import DatePicker from "core/ReactForm/components/DatePicker";
import PropertyActions from "store/actions/property_actions";

const NewTask = (props) => {
  const propertyId = props.propertyId;
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const userToken = useSelector((state) => state.user.token);

  const [values, setValues] = useState({
    date: null,
    note: "",
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!values.date) {
      enqueueSnackbar("Date filed not be empty", { variant: "error" });
      return;
    }

    if (!values.note) {
      enqueueSnackbar("Note filed not be empty", { variant: "error" });
      return;
    }

    setLoading(true);

    const response = await addNewFollowUpTaskAPI(
      userToken,
      propertyId,
      values.date,
      values.note
    );
    if (!response.error) {
      setValues({ date: null, note: "" });
      enqueueSnackbar("New follow up task added", { variant: "success" });
      props.onNewTask(response);
      PropertyActions.addFollowUpTask(propertyId, response);
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }

    setLoading(false);
  };

  return (
    <Card style={{ backgroundColor: "#f5fbfe" }}>
      <form onSubmit={handleOnSubmit}>
        <CardHeader subheader="Create new follow up task" title="New Task" />
        <Divider />
        <CardContent>
          <DatePicker
            value={values.date}
            onChange={(name, date) => setValues((v) => ({ ...v, date }))}
            input={{ label: "Remind me", name: "date" }}
          />
          <TextField
            fullWidth
            label="Note"
            name="note"
            onChange={(event) => {
              event.persist();
              setValues((v) => ({ ...v, note: event.target.value }));
            }}
            style={{ marginTop: "1rem" }}
            value={values.note}
            variant="outlined"
            rows={4}
            multiline
          />
        </CardContent>
        <Divider />
        <CardActions>
          <LoadingButton
            circleStyle={{ left: "20%" }}
            loading={loading}
            title="Create New"
            type="submit"
          />
        </CardActions>
      </form>
    </Card>
  );
};

NewTask.propTypes = {
  propertyId: PropTypes.string.isRequired,
  onNewTask: PropTypes.func,
};

export default NewTask;
