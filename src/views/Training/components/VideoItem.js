import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DateFormat from "core/utils/DateFormat";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 320,
    height: 180,
  },
  publishOn: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "#333",
  },
}));

const VideoItem = ({ video }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root} style={{ margin: theme.spacing(2) }}>
      <CardActionArea
        style={{ width: "auto" }}
        onClick={() => window.open(video.url, "_blank")}
      >
        <CardMedia
          className={classes.cover}
          image={video.thumbnail}
          title={video.title}
        />
      </CardActionArea>

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h6">
            <a href={video.url} className={classes.link} target="_blank">
              {video.title}
            </a>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {video.description}
          </Typography>
        </CardContent>
        <div className={classes.publishOn}>
          <Typography variant="subtitle1" color="textSecondary">
            <b>Publish on:</b> <DateFormat date={video.publishOn} />
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default VideoItem;
