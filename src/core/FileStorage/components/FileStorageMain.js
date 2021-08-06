import React from "react";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckIcon from "@material-ui/icons/Check";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { withRouter } from "react-router-dom";

import ImagePreview from "./ImagePreview";
import ImageProgress from "./ImageProgress";
import SelectImagesButton from "./SelectImagesButton";
import { FileManager, FileUploader } from "reactjs-file-uploader";
import SelectFilesButton from "./SelectFilesButton";
import FilePreview from "./FilePreview";

const styles = {
  containerStyle: {
    border: "thin solid rgb(221, 221, 221)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  controlsStyle: {
    padding: 25,
    backgroundColor: "whitesmoke",
    textAlign: "center",
  },
  controlStyle: {
    margin: 10,
  },
  fileStyle: {
    width: "100%",
    height: "100%",
    border: "thin solid #eee",
    borderRadius: 10,
    overflow: "hidden",
    cursor: "pointer",
  },
  wrapperStyle: {
    position: "relative",
  },

  buttonStyle: {
    position: "absolute",
    width: 44,
    height: 44,
    right: 16,
    bottom: 16,
  },

  progressStyle: {
    position: "absolute",
    width: 52,
    height: 52,
    bottom: 12,
    right: 12,
    zIndex: 1,
    color: "white",
  },

  eventContainer: {
    padding: 25,
    backgroundColor: "whitesmoke",
  },
};

class FileStorageMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      events: {},
      progress: {},
      selectedIndex: null,
      multiple: true,
      autoUpload: false,
      showEvents: false,
    };

    this.uploadFile = this.uploadFile.bind(this);
    this.showProgress = this.showProgress.bind(this);
    this.hideProgress = this.hideProgress.bind(this);
  }

  showProgress() {
    const { progress } = this.state;
    progress["SpecialKey"] = 100;
    this.setState({ progress });
  }

  hideProgress() {
    const { progress } = this.state;
    delete progress["SpecialKey"];
    this.setState({ progress });
  }

  render() {
    const totalProgress = Object.values(this.state.progress).reduce(
      (a, b) => a + b,
      0
    );
    const progress =
      (totalProgress / Object.keys(this.state.progress).length) * 100 || 0;

    return (
      <div>
        <LinearProgress
          variant={progress < 100 ? "determinate" : "indeterminate"}
          value={progress}
        />

        <div style={styles.controlsStyle}>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                if (this.props.type === "photos") {
                  this.props.history.push(
                    `/property/files-photos/photos/${this.props.cloudData.propertyId}`
                  );
                } else {
                  this.props.history.push(
                    `/property/files-photos/files/${this.props.cloudData.propertyId}`
                  );
                }
              }}
            >
              <ArrowBackIcon style={{ marginRight: 10 }} />
              Go Back
            </Button>
            {this.props.type === "files" ? (
              <SelectFilesButton
                multiple={this.state.multiple}
                onChange={(event) => {
                  this.setState({
                    files: this.state.files.concat(
                      Array.from(event.target.files)
                    ),
                  });
                }}
                button={
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={styles.controlStyle}
                  >
                    Select Files
                    <CloudUploadIcon style={{ marginLeft: 10 }} />
                  </Button>
                }
              />
            ) : (
              <SelectImagesButton
                showProgress={this.showProgress}
                hideProgress={this.hideProgress}
                multiple={this.state.multiple}
                onChange={(images) => {
                  this.setState({
                    files: this.state.files.concat(Array.from(images)),
                  });
                }}
                button={
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={styles.controlStyle}
                  >
                    Select Images
                    <CloudUploadIcon style={{ marginLeft: 10 }} />
                  </Button>
                }
              />
            )}
          </div>

          <FormControlLabel
            style={styles.controlStyle}
            control={
              <Switch
                color="primary"
                checked={this.state.multiple}
                onClick={() =>
                  this.setState({ multiple: !this.state.multiple })
                }
              />
            }
            label="Allow Multiple"
          />
          <FormControlLabel
            style={styles.controlStyle}
            control={
              <Switch
                color="primary"
                checked={this.state.autoUpload}
                onClick={() =>
                  this.setState({ autoUpload: !this.state.autoUpload })
                }
              />
            }
            label="Auto Upload"
          />
        </div>

        <FileManager files={this.state.files}>
          {(files) => (
            <div style={styles.containerStyle}>
              {files.map(this.uploadFile)}
            </div>
          )}
        </FileManager>
      </div>
    );
  }

  uploadFile(file) {
    return (
      <FileUploader
        key={file.key}
        file={file}
        readFile
        url={this.props.cloudData.url}
        autoUpload={this.state.autoUpload}
        formData={{
          file: file,
          name: file.name,
          propertyId: this.props.cloudData.propertyId,
          albumId: this.props.cloudData.albumId,
          albumName: this.props.cloudData.albumName,
          token: this.props.userToken,
        }}
        onUploadReady={(event) => {
          const { progress } = this.state;
          progress[file.key] = 0;
          this.setState({ progress, selectedIndex: file.key });
          this.addTransitionState(event, FileUploader.UPLOAD_READY, file.key);
        }}
        onUploadStart={(event) => {
          this.addTransitionState(event, FileUploader.UPLOAD_START, file.key);
        }}
        onUploadProgress={(event) => {
          const { progress } = this.state;
          progress[file.key] = event.total ? event.loaded / event.total : 0;
          this.setState({ progress });
          this.addTransitionState(
            event,
            FileUploader.UPLOAD_PROGRESS,
            file.key
          );
        }}
        onUploadComplete={(event) => {
          this.addTransitionState(
            event,
            FileUploader.UPLOAD_COMPLETE,
            file.key
          );
        }}
        onDownloadStart={(event) => {
          this.addTransitionState(event, FileUploader.DOWNLOAD_START, file.key);
        }}
        onDownloadProgress={(event) => {
          this.addTransitionState(
            event,
            FileUploader.DOWNLOAD_PROGRESS,
            file.key
          );
        }}
        onDownloadComplete={(event) => {
          const { progress } = this.state;
          delete progress[file.key];
          this.setState({ progress });
          this.addTransitionState(
            event,
            FileUploader.DOWNLOAD_COMPLETE,
            file.key
          );
        }}
      >
        {(data) => {
          if (data.requestState === FileUploader.DOWNLOAD_COMPLETE) {
            this.props.onDownloadComplete(data.response);
          }

          const fileContainerStyle = {
            width: 150,
            height: 150,
            margin: 25,
          };

          return (
            <div
              style={fileContainerStyle}
              onClick={() => {
                this.setState({ selectedIndex: file.key });
              }}
            >
              <div style={styles.fileStyle}>
                {this.props.type === "photos"
                  ? FileStorageMain.renderImage(data)
                  : FileStorageMain.renderFile(data)}
              </div>
              <div>{FileStorageMain.renderButton(data)}</div>
            </div>
          );
        }}
      </FileUploader>
    );
  }

  static renderButton(data) {
    switch (data.requestState) {
      case FileUploader.UPLOAD_READY:
        return (
          <div style={styles.wrapperStyle}>
            <Fab
              style={styles.buttonStyle}
              color="primary"
              onClick={data.startUpload}
            >
              <CloudUploadIcon />
            </Fab>
          </div>
        );

      case FileUploader.ABORT:
      case FileUploader.UPLOAD_START:
      case FileUploader.UPLOAD_PROGRESS: {
        const progress = data.uploadProgress
          ? Math.floor(
              (data.uploadProgress.loaded / data.uploadProgress.total) * 100
            )
          : 0;

        return (
          <div style={styles.wrapperStyle}>
            <Fab
              style={styles.buttonStyle}
              color="primary"
              onClick={data.startUpload}
            >
              {progress || 0}
            </Fab>
            <CircularProgress style={styles.progressStyle} size={68} />
          </div>
        );
      }

      case FileUploader.UPLOAD_COMPLETE:
      case FileUploader.DOWNLOAD_PROGRESS:
      case FileUploader.DOWNLOAD_COMPLETE:
        return (
          <div style={styles.wrapperStyle}>
            <Fab style={styles.buttonStyle} onClick={data.startUpload}>
              <CheckIcon />
            </Fab>
          </div>
        );

      case FileUploader.ERROR:
        return <p>Error</p>;

      default:
        return <p>Something has gone wrong!</p>;
    }
  }

  static renderImage(data) {
    switch (data.requestState) {
      case FileUploader.UPLOAD_READY:
        return <ImagePreview src={data.fileData || ""} />;

      case FileUploader.UPLOAD_COMPLETE:
      case FileUploader.UPLOAD_START:
      case FileUploader.UPLOAD_PROGRESS:
      case FileUploader.ABORT: {
        const progress = data.uploadProgress
          ? Math.floor(
              (data.uploadProgress.loaded / data.uploadProgress.total) * 100
            )
          : 0;

        return (
          <ImageProgress
            src={data.fileData}
            progress={progress}
            completed={progress === 100}
          />
        );
      }

      case FileUploader.DOWNLOAD_PROGRESS:
      case FileUploader.DOWNLOAD_COMPLETE:
        return <ImagePreview src={data.fileData || ""} />;
      default:
        return <p>Something has gone wrong!</p>;
    }
  }

  static renderFile(data) {
    switch (data.requestState) {
      case FileUploader.UPLOAD_READY:
        return <FilePreview />;

      case FileUploader.UPLOAD_COMPLETE:
      case FileUploader.UPLOAD_START:
      case FileUploader.UPLOAD_PROGRESS:
      case FileUploader.ABORT: {
        const progress = data.uploadProgress
          ? Math.floor(
              (data.uploadProgress.loaded / data.uploadProgress.total) * 100
            )
          : 0;

        return (
          <ImageProgress
            src={data.fileData}
            progress={progress}
            completed={progress === 100}
          />
        );
      }

      case FileUploader.DOWNLOAD_PROGRESS:
      case FileUploader.DOWNLOAD_COMPLETE:
        return <FilePreview />;
      default:
        return <p>Something has gone wrong!</p>;
    }
  }

  addTransitionState(event, eventName, index) {
    const { events } = this.state;

    const eventState = {
      eventName,
      eventObject: event,
      eventTimestamp: +new Date(),
    };

    if (!events[index]) {
      events[index] = [eventState];
    } else {
      events[index].push(eventState);
    }

    this.setState({ events });
  }
}

export default withRouter(FileStorageMain);
