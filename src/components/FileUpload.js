import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as _apiUtils from "./util/AxiosUtil";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      fileUploaded: "",
      hideFileUpload: true,
      fileUploadedName: "",
      groupId: props.groupData,
      subjectName: props.subjectName,
      title: props.title,
      studentDetails: props.studentDetails,
      fileName: "",
      exerciseFiles: "",
      showFlash: false,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.fetchFile = this.fetchFile.bind(this);
    this.displayFile = this.displayFile.bind(this);
  }
  componentDidMount() {
    _apiUtils.loadDrivesByGroupId(this.state.groupId).then((driveRes) => {
      _apiUtils
        .searchByGroup_Title(this.state.groupId, this.state.title)
        .then((res) => {
          // console.log(process.env.REACT_APP_GRAPH_API_URL+`sites/${this.state.groupId}/drives/${driveRes.data.value[0].id}/items/${res.data.value[0].id}/children`);
          if (res.data.value[0]) {
            _apiUtils
              .getStudentUploadedExerciseFiles(
                driveRes.data.value[0].id,
                res.data.value[0].id
              )
              .then((fileRes) => {
                this.setState({ exerciseFiles: fileRes.data });
                console.log(fileRes.data);
              });
          }
        });
    });
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0];
    this.setState({
      file: this.file.name,
    });
    document.getElementById(
      "choose_text"
    ).innerHTML = this.file.name.toUpperCase();
  };

  cancelClick = (event) => {
    this.setState({
      hideFileUpload: true,
    });
  };

  handleUploadClick = (event) => {
    this.setState({
      hideFileUpload: false,
    });
  };
  fetchFile = (event) => {
    _apiUtils.getBLOB(event.target.id).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        this.props.exerciesDetails.filename
          ? this.props.exerciesDetails.filename
          : this.props.exerciesDetails.objectFilename
      );
      document.body.appendChild(link);
      link.click();
    });
  };

  handleClick = (event) => {
    const formData = new FormData();
    formData.append(this.file.name, this.file);

    _apiUtils
      .loadDrivesByGroupId(this.state.groupId)
      .then((driveRes) => {
        _apiUtils
          .searchByGroup_Title(this.state.groupId, this.state.title)
          .then((res) => {
            // console.log(process.env.REACT_APP_GRAPH_API_URL+"sites/"+process.env.REACT_APP_SHARE_POINT_URL+`/drives/${driveRes.data.value[0].id}/items/${res.data.value[0].id}:/${this.file.name}:/content`);
            if (res.data.value[0]) {
              _apiUtils
                .uploadStudentExerciseFile(
                  formData,
                  this.state.groupId,
                  driveRes.data.value[0].id,
                  res.data.value[0].id,
                  this.state.studentDetails.displayName
                )
                .then((response) => {
                  console.log(response.data);
                  this.setState({ fileUploadedName: response.data });
                  this.setState({ fileName: this.file.name });
                  this.fileUploaded = true;
                  this.setState({ showFlash: true });
                  setTimeout(() => {
                    this.setState({ showFlash: false });
                  }, 3000);
                })
                .catch((error) => {
                  console.log(error);
                });
              this.setState({
                hideFileUpload: true,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  displayFile() {
    return (
      <Fragment>
        {this.props.exerciesDetails.objectFilename ? (
          <tr className="testing-color-blue col-12">
            <td>
              {this.props.exerciesDetails.objectFilename.replace(".PDF", "")}
            </td>
            <td className="filelink icons">
              <a href="#?">
                <i
                  class="fas fa-eye fa-2x"
                  id={this.props.exerciesDetails.fileObject}
                  onClick={this.fetchFile}
                ></i>
              </a>{" "}
              &nbsp;&nbsp;
              <a href="#?">
                <i
                  class="fas fa-download fa-2x"
                  id={this.props.exerciesDetails.fileObject}
                  onClick={this.fetchFile}
                ></i>
              </a>
            </td>
            <td className="float-right">
              <a
                href="#?"
                onClick={this.handleUploadClick}
                className="btn btn-primary"
              >
                <i class="fas fa-upload"></i> Upload Exercise
              </a>
            </td>
          </tr>
        ) : (
          ""
        )}
        {this.props.exerciesDetails.filename &&
        this.props.exerciesDetails.filelink ? (
          <tr className="testing-color-blue col-12">
            <td>{this.props.exerciesDetails.filename.replace(".PDF", "")}</td>
            <td className="filelink icons">
              <a href={this.props.exerciesDetails.filelink} target="_blank">
                <i class="fas fa-eye fa-2x"></i>
              </a>
              &nbsp;&nbsp;
              {this.props.exerciesDetails.filelink.indexOf("htm") === -1 ? (
                <a href={this.props.exerciesDetails.filelink} target="_blank">
                  <i class="fas fa-download fa-2x"></i>
                </a>
              ) : (
                ""
              )}
            </td>
            <td className="float-right">
              <a
                href="#?"
                onClick={this.handleUploadClick}
                className="btn btn-primary"
              >
                <i class="fas fa-upload"></i> Upload Exercise
              </a>
            </td>
          </tr>
        ) : (
          ""
        )}
        {!this.props.exerciesDetails.objectFilename &&
        (!this.props.exerciesDetails.filename ||
          !this.props.exerciesDetails.filelink) ? (
          <tr>
            <td></td>
            <td></td>
            <td className="float-right">
              <a
                href="#?"
                onClick={this.handleUploadClick}
                className="btn btn-primary"
              >
                <i class="fas fa-upload"></i> Upload Exercise
              </a>
            </td>
          </tr>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
  render() {
    return (
      <Fragment>
        <table className="col-12 table table-stripped">
          {this.displayFile()}
          {this.state.showFlash ? (
            <tr>
              <td colspan="3" className="alert alert-success">
                File Uploaded Successfully
              </td>
            </tr>
          ) : (
            ""
          )}
          {this.state.fileUploadedName ? (
            <tr>
              <td className="filelink">
                {this.state.fileUploadedName ? this.state.fileName : ""}
              </td>
              <td colspan="2" className="filelink icons">
                {this.state.fileUploadedName ? (
                  <a href={this.state.fileUploadedName.webUrl} target="_blank">
                    <i class="fas fa-eye fa-2x"></i>
                  </a>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
        </table>
        <div>
          {this.state.hideFileUpload === false ? (
            <div class="card card-body fileblock col-12">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="customFile"
                  onChange={this.handleFileChange}
                />
                <label id="choose_text" className="custom-file-label">
                  Choose file
                </label>
              </div>
              <div className="form-group">
                <br />
                <button
                  type="reset"
                  onClick={this.cancelClick}
                  className="btn btn-danger"
                >
                  <i class="far fa-times-circle"></i> Cancel
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-success upload-btn"
                  onClick={this.handleClick}
                >
                  <i class="fas fa-cloud-upload-alt"></i> Submit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <table className="table table-stripped">
            {this.state.exerciseFiles &&
              this.state.exerciseFiles.value.map((exe, i) => (
                <tr>
                  <td className="filename">
                    {exe.name.replace(
                      this.state.studentDetails.displayName.replace("/", "_") +
                        "_",
                      ""
                    )}
                  </td>
                  <td className="file_icons">
                    <a href={exe.webUrl} target="_blank">
                      <i class="fas fa-eye fa-2x"></i>
                    </a>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </Fragment>
    );
  }
}
