import React, { useState, createRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import List from "@material-ui/core/List";
import ChatRight from "./components/ChatRight";
import ChatLeft from "./components/ChatLeft";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import PropertyActions from "store/actions/property_actions";
import {
  getSinglePropertyAPI,
  propertyCommunicationAPI,
} from "api/property/property";
import CommunicationSkeleton from "core/Skeleton/CommunicationSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    margin: "auto",
  },
  chatArea: {
    height: "70vh",
    overflowY: "auto",
  },
}));

const getSingleProperty = createSelector(
  (state) => state.property.single,
  (_, propertyId) => propertyId,
  (property, propertyId) => property[propertyId]
);

const Communication = (props) => {
  const classes = useStyles();
  const listRef = createRef();
  const user = useSelector((state) => state.user);
  const me = user.userId;
  const token = user.token;
  const propertyId = props.match.params.id;
  const [message, setMessage] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const propertyData = useSelector((state) =>
    getSingleProperty(state, propertyId)
  );

  const loadSingleProperty = async () => {
    if (propertyData === undefined) {
      const response = await getSinglePropertyAPI(propertyId);
      PropertyActions.loadSingleProperty(propertyId, response);
    }
  };

  useEffect(() => {
    loadSingleProperty();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [listRef]);

  const handleOnSubmit = async () => {
    const response = await propertyCommunicationAPI(token, propertyId, message);
    if (!response.error) {
      PropertyActions.addCommunicationMessage(propertyId, response);
      enqueueSnackbar("Message successfully added", { variant: "success" });
    } else {
      enqueueSnackbar(response.error.message, { variant: "error" });
    }
    setMessage("");
  };

  if (propertyData === undefined) {
    return <CommunicationSkeleton rows={3} />;
  }

  return (
    <div>
      <Grid className={classes.root} container direction="column">
        <List className={classes.chatArea} ref={listRef}>
          {propertyData.communication &&
            propertyData.communication.map((chat) => {
              if (chat.user_id === me) {
                return <ChatRight key={chat.id} chat={chat} />;
              }

              return <ChatLeft key={chat.id} chat={chat} />;
            })}
        </List>

        <Grid container>
          <TextField
            fullWidth
            label="Type something"
            name="communication_note"
            type="text"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleOnSubmit}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Communication;
