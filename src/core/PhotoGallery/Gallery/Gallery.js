import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from "@material-ui/core/GridList";
import SinglePhoto from "./components/SinglePhoto";
import NoPhotoFound from "core/Skeleton/NoPhotoFound";

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
      return 6;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 5;
    } else if (screenMedium) {
      return 4;
    } else if (screenSmall) {
      return 3;
    } else if (screenExtraSmall) {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <>
      <div className={classes.root}>
        {props.photos.length ? (
          <GridList cols={getScreenWidth()} style={{ width: "100%" }}>
            {props.photos.map((tile, index) => (
              <SinglePhoto
                onClick={props.onPhotoClick}
                imageIndex={index}
                key={tile.photo_id}
                tile={{ ...tile }}
                info={props.info}
              />
            ))}
          </GridList>
        ) : (
          <NoPhotoFound />
        )}
      </div>
    </>
  );
};

Gallery.propTypes = {
  onPhotoClick: PropTypes.func,
  photos: PropTypes.array.isRequired,
  info: PropTypes.exact({
    propertyId: PropTypes.string.isRequired,
    albumId: PropTypes.string.isRequired,
  }),
};

export default Gallery;
