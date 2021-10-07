import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as _apiUtils from "./util/AxiosUtil";
import * as _constants from "./util/constants";
import { ReactComponent as Upload } from '../assets/icons/upload.svg'
import { ReactComponent as Download } from '../assets/icons/download.svg'
import { ReactComponent as Eye } from '../assets/icons/eye.svg'
import { ReactComponent as EyeBlack } from '../assets/icons/eye-black.svg'
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
      fileName: "",
      exerciseFiles: "",
      showFlash: false,
      courseId: props.user.selectedCourseId,
      assignmentId: props.assignmentId,
      exerciseButtonText: 'Upload Exercise', //this.props.user.isTeacherLogin? 'Upload Exercise Material' : 'Upload Exercise',
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.fetchFile = this.fetchFile.bind(this);
    this.displayFile = this.displayFile.bind(this);
    this.msLoadStudentUploadedFiles = this.msLoadStudentUploadedFiles.bind(
      this
    );
    this.googleLoadStudentUploadedFiles = this.googleLoadStudentUploadedFiles.bind(
      this
    );
    this.msUploadStudentExercises     = this.msUploadStudentExercises.bind(this);
    this.googleUploadStudentExercises = this.googleUploadStudentExercises.bind(this);
    this.buildUploadBlock = this.buildUploadBlock.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("loginProvider") === _constants.MICROSOFT) {
      this.msLoadStudentUploadedFiles();
    } else {
      this.googleLoadStudentUploadedFiles();
    }
  }

  buildUploadBlock(fileNameToDisplay, fileLink) {
    return (
      <div className="accordion__button tbl-header">
        {/*  **** Google file thumbnail link 
         {this.props.exerciseDetails.fileThumbnailLink ? (
        <img
          src={this.props.exerciseDetails.fileThumbnailLink}
          className="thumbnailIcon"
          display="block"
        />
      ) : (
        ""
      )} */}

        {fileNameToDisplay === null ? (
          <h2>{"no exercise material"}</h2>
        ) : (
          <Fragment>
            <h2>{fileNameToDisplay}</h2>
            <div className="">
              <a href={fileLink} target="_blank"  className="btn-red bg-green txt-black">
              <Eye/> 
              </a>
              &nbsp;&nbsp;
              {fileLink && fileLink.indexOf("htm") === -1 ? (
                <a href={fileLink} target="_blank"  className="btn-red bg-green txt-black mr-2">
                  <Download/>
                </a>
              ) : (
                <a href="#?" className="btn-red bg-green txt-black mr-2">
                   <Download/>
                  <i id={this.props.exerciseDetails.fileObject}
                    onClick={this.fetchFile}
                  ></i>
                </a>
              )}
            </div>
          </Fragment>
        )}
        {!this.props.user.isTeacherLogin?
          <button
            className="btn-red bg-green txt-white"
            onClick={this.handleUploadClick}
            disabled={!this.props.isActive}
          >
              <Upload className="mr-2"/>
            {this.state.exerciseButtonText}
          </button>
          :""
        }
      </div>
    );
  }
  msLoadStudentUploadedFiles() {
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

  googleLoadStudentUploadedFiles() {
    _apiUtils
      .getGoogleStudentUploadedExerciseFiles(
        this.state.courseId,
        this.state.assignmentId
      )
      .then((response) => {
        let exerciseFiles = { value: [] };

        // -- data mapper ---------------------------------------------------------------------------
        // -- school app / api currently expects here an array of objects with "name" and "webUrl" as
        // -- keys to the file name and file url: so we map Google's "title" and "alternateLink" back
        // -- to file "name" and file "webUrl" -> should be done in API.js (current AxiosUtils.js)
        // -- ---------------------------------------------------------------------------------------
        // -- TODO: there are 4 types of attachments: "driveFile", "youTubeVideo", "link" and "form".
        // --       -> currently we only deal with "driveFile", so there other 3 are pending. -------
        let submission = response.data.studentSubmissions[0];

        if (!submission || !submission.assignmentSubmission.attachments) return;

        submission.assignmentSubmission.attachments.map((attachment) =>
          exerciseFiles.value.push({
            name: attachment.driveFile.title,
            webUrl: attachment.driveFile.alternateLink,
          })
        );

        this.setState({ exerciseFiles: exerciseFiles });
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
    let resData;
    if (sessionStorage.getItem("loginProvider") === _constants.MICROSOFT) {
      _apiUtils
        .getBLOB(event.target.id, this.props.exerciseDetails.filetype)
        .then((response) => {
          resData = response.data;
        });
    } else {
      alert("******Google BLOB******");
    }
    if (resData !== null) {
      const url = window.URL.createObjectURL(new Blob([resData]));
      const link = document.createElement("a");
      link.href = url;
      //TODO: BLOB(file attached within the exercise) is related to objectFile,
      // then why filename check is done instead of directly using objectFilename?
      link.setAttribute(
        "download",
        this.props.exerciseDetails.filename
          ? this.props.exerciseDetails.filename
          : this.props.exerciseDetails.objectFilename
      );
      document.body.appendChild(link);
      link.click();
    }
  };

  handleClick = (event) => {
    if (sessionStorage.getItem("loginProvider") === _constants.MICROSOFT) {
      this.msUploadStudentExercises();
    } else {
      this.googleUploadStudentExercises();
    }
    this.setState({ fileName: this.file.name, showFlash: true, hideFileUpload: true, fileUploaded: true,});
    setTimeout(() => {
      this.setState({ showFlash: false });
    }, 3000);
   
  };

  msUploadStudentExercises() {
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
                  this.props.user.name,
                  this.file.name
                )
                .then((response) => {
                  console.log(response.data);
                  this.setState({ fileUploadedName: response.data });
                })
                .catch((error) => {
                  console.log(error);
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
  }

  googleUploadStudentExercises() {
    _apiUtils.googleClassroomCourseStudentsList(this.state.courseId, "me").then((response) => {
      let folderId = response.data.studentWorkFolder.id

      _apiUtils.googleDriveUploadFile(this.file.name, this.file, this.file.type, folderId).then((response) => {
        this.setState({ fileUploadedName: response.data });
        console.log(response.data)
        let fileId = response.data.id
        _apiUtils.googleClassroomGetCourseworkSubmissions(this.state.courseId, this.state.assignmentId).then((response) => {
          let submissionId = response.data.studentSubmissions[0].id
          
          /* disabling the code to facilitate developement
          Current error: 403, may be change in google api policies.. hint CORS
          
          _apiUtils.googleClassroomSubmissionAddFile(
            this.state.courseId, this.state.assignmentId, submissionId, fileId
          ).then((response) => { console.log(response) })
          */
        })
      })
    })
  }

  displayFile() {
    //truncate file extention  **START**
    let fileNameToDisplay = this.props.exerciseDetails.objectFilename
      ? this.props.exerciseDetails.objectFilename
      : this.props.exerciseDetails.filename
      ? this.props.exerciseDetails.filename
      : "no filename";

    //execute only if filename has "."
    if (fileNameToDisplay.indexOf(".") !== -1)
      fileNameToDisplay = fileNameToDisplay.substring(
        0,
        fileNameToDisplay.indexOf(".")
      );
    //truncate file extention  **END**
    return (
      <Fragment>
        {this.props.exerciseDetails.objectFilename
          ? this.buildUploadBlock(
              fileNameToDisplay,
              this.props.exerciseDetails.fileObject
            )
          : ""}
        {this.props.exerciseDetails.filename &&
        this.props.exerciseDetails.filelink
          ? this.buildUploadBlock(
              fileNameToDisplay,
              this.props.exerciseDetails.filelink
            )
          : ""}
        {!this.props.exerciseDetails.objectFilename &&
        (!this.props.exerciseDetails.filename ||
          !this.props.exerciseDetails.filelink)
          ? this.buildUploadBlock(null, null)
          : ""}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
          {this.displayFile()}
          {this.state.showFlash ? (
              <div className="alert alert-success">
                File Uploaded Successfully
              </div>
          ) : (
            ""
          )}
          {this.state.fileUploadedName ? (
            <table className="custom-table table table-striped table-hover">
              <tbody>
              <tr>
                <td className="filelink">
                  {this.state.fileUploadedName ? this.state.fileName : ""}
                </td>
                <td colspan="2" className="filelink icons">
                  {this.state.fileUploadedName ? (
                    <a href={this.state.fileUploadedName.webUrl} target="_blank">
                      <i className="fas fa-eye fa-2x"></i>
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              </tbody>
            </table>
          ) : (
            ""
          )}
        <div>
          {this.state.hideFileUpload === false ? (
            <div className="card-body fileblock col-12">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
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
                  <i className="far fa-times-circle"></i> Cancel
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-success upload-btn"
                  onClick={this.handleClick}
                >
                  <i className="fas fa-cloud-upload-alt"></i> Submit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <table className="custom-table table table-striped table-hover">
            <tbody>
            {this.state.exerciseFiles &&
              this.state.exerciseFiles.value.map((exe, i) => (
                <tr>
                  <td className="filename text-left">
                    {exe.name.replace(
                      this.props.user.name.replace("/", "_") + "_",
                      ""
                    )}
                  </td>
                  <td className="file_icons text-left">
                    <a href={exe.webUrl} target="_blank">
                      <EyeBlack />
                    </a>
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}
