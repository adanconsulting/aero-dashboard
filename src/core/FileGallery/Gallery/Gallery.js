import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from "@material-ui/core/GridList";
import SingleFile from "./components/SingleFile";
import NoFileFound from "core/Skeleton/NoFileFound";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Gallery = (props) => {
  const classes = useStyles();

  const screenExtraLarge = useMediaQuery((theme) =>
    theme.breakpoints.only("xl")
  );
  const screenLarge = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const screenMedium = useMediaQuery((theme) => theme.breakpoints.only("md"));
  const screenSmall = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  const screenExtraSmall = useMediaQuery((theme) =>
    theme.breakpoints.only("xs")
  );
  const screenNarrow = useMediaQuery("(max-width:340px)");

  const getScreenWidth = () => {
    if (screenExtraLarge) {
      return 4;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 3;
    } else if (screenMedium) {
      return 3;
    } else if (screenSmall) {
      return 2;
    } else if (screenExtraSmall) {
      return 1;
    } else {
      return 3;
    }
  };

  return (
    <>
      <div className={classes.root}>
        {props.files.length ? (
          <GridList
            cellHeight={100}
            spacing={24}
            cols={getScreenWidth()}
            style={{ width: "100%" }}
          >
            {props.files.map((tile) => (
              <SingleFile
                key={tile.file_id}
                tile={{ ...tile }}
                propertyId={props.propertyId}
              />
            ))}
          </GridList>
        ) : (
          <NoFileFound />
        )}
      </div>
    </>
  );
};

Gallery.propTypes = {
  files: PropTypes.array.isRequired,
  propertyId: PropTypes.string.isRequired,
};

export default Gallery;
