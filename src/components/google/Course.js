/* global gapi */
import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "../FileUpload";
import Interaction from "../communication/Interaction";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Video from "../Video";
import * as _util from "../util/utils";
import * as _apiUtils from "../util/AxiosUtil";
import "@fortawesome/fontawesome-free/css/all.css";
import {REACT_APP_GOOGLE_OAUTH_TUTOR_SCOPES} from "../util/gConsts"
import { ACCESS_TOKEN } from "../util/constants";
import {Modal, Button} from "react-bootstrap";

// let user = {
//   name,
//   group: { name, id },
//   subjects: { exercises: { exerciseTitle, exercisedata, submissionDate } },
// };

let isLoading = false;
let userData = {
  displayName: "Name",
  department: "Group Name",
};
 
export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: "",
      assignments: "",
      userName: "",
      currentView: "",
      material: { formUrls: [] },
      turnInState: "Unknown",
      submissionId: "",
      showTeacherModal: true,
      isTeacherLogin: false,
      hasTeacherAccepted: true,
    };
    this.extractMaterials = this.extractMaterials.bind(this);
  }

  getSubmissionTurnInState(courseId, assignmentId) {
    // _apiUtils.googleClassroomGetCourseworkSubmissions(courseId, assignmentId).then((response) => {
    //   let state      = response.data.studentSubmissions[0].state
    //   let submission = response.data.studentSubmissions[0].id

    //   if (this.state.turnInState  !== state)      { this.setState({ turnInState:  state}) }
    //   if (this.state.submissionId !== submission) { this.setState({ submissionId: submission}) }
    // })
  }

  handleSubmissionTurnIn(courseId, assignmentId, submissionId) {
    _apiUtils.googleClassroomSubmissionTurnIn(courseId, assignmentId, submissionId).then((response) => {
      this.getSubmissionTurnInState(courseId, assignmentId)
    })
  }


  handleTeacherDialogClose = () => {this.setState({showTeacherModal: false, hasTeacherAccepted: false})};

  handleTeacherConfirmation = () => {
    this.setState({isTeacherLogin: false, showTeacherModal: false, hasTeacherAccepted: true});
    const options = new gapi.auth2.SigninOptionsBuilder();
    options.setScope(REACT_APP_GOOGLE_OAUTH_TUTOR_SCOPES);

    let googleUser = gapi.auth2.getAuthInstance().currentUser.get();
    googleUser.grant(options).then(
      function (success) {
        // console.log(JSON.stringify({ message: "success", value: success }))
        // console.log("success.access_token " + success.wc.access_token)
        sessionStorage.setItem(ACCESS_TOKEN, success.wc.access_token);
      },
      function (fail) {
        alert(JSON.stringify({ message: "fail", value: fail }));
      })
  }

  extractMaterials(assginmentMaterials) {
    let materialObj = {
      formUrls: [],
      youtubeVideos: [],
      exerciseDetails: [],
    };
    assginmentMaterials &&
      assginmentMaterials.map(function (material, i) {
        //FORMS
        if (material && material.form) {
          let formUrl = material.form.formUrl;
          materialObj.formUrls[i] = formUrl;
        }

        //VIDEO
        if (material && material.youtubeVideo) {
          let youtube = { id: "", title: "", thumbnailUrl: "" };
          youtube.id = material.youtubeVideo.id;
          youtube.name = material.youtubeVideo.title;
          youtube.thumbnailUrl = material.youtubeVideo.thumbnailUrl;
          materialObj.youtubeVideos[i] = youtube;
        }

        //DRIVE
        if (material && material.driveFile) {
          let tempExerciseDetails = {
            filename: "",
            filelink: "",
            fileThumbnailLink: "",
            //****below are, as of now not applicable for google****
            //filetype: "",  // google doesnt have an option of *BLOB* to download
            //objectFilename: "",
          };
          tempExerciseDetails.filename = material.driveFile.driveFile.title;
          tempExerciseDetails.filelink =
            material.driveFile.driveFile.alternateLink;
          tempExerciseDetails.fileThumbnailLink =
            material.driveFile.driveFile.thumbnailUrl;
          materialObj.exerciseDetails[i] = tempExerciseDetails;
        }
      });
    this.state.material = materialObj;
  }

  componentDidMount() {
    isLoading = true;
    let userId;
    _apiUtils
      .userProfile()
      .then((response) => {
        userId = response.data.id;
        userData.displayName = response.data.name;
        userData.department = response.data.family_name;
        this.props.userData(userData);
        this.setState({ userName: response.data.name });
        // load courses
        _apiUtils
          .loadGoogleSubjects()
          .then((subjectRes) => {
            console.log(subjectRes);
            isLoading = false;
            this.setState({
              courses: subjectRes.data.courses,
            });
            if (subjectRes.data.courses.length > 0 && subjectRes.data.courses[0].hasOwnProperty("teacherFolder")) 
              _apiUtils.googleClassroomCourseTeachersList(subjectRes.data.courses[0].id).then((resTeacher) =>{
                if(userId === resTeacher.data.userId)
                  console.log("You are identified as Teacher! ");
                  this.setState({isTeacherLogin: true});
              });
           })
          .catch((error) => {
            console.error("Error during loadGoogleSubjects:", error);
          });
      })
      .catch((error) => {
        console.error("Error during google userProfile:", error);
      });
  }

  loadAssignment = (event) => {
    isLoading = true;
    this.setState({ currentView: this.state.courses[event.target.id].name });
    _apiUtils
      .loadGoogleAssignments(this.state.courses[event.target.id].id)
      .then((response) => {
        this.setState({
          assignments: response.data.courseWork,
        });
      })
      .catch((error) => {
        console.error("Error during google userProfile:", error);
      });
    isLoading = false;
  };

  render() {
    let hasDriveFiles = false;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="row sub-excer-section">
              <div className="col-12">
                <ul
                  className="nav nav-pills mb-3 sub-nav"
                  id="pills-tab"
                  role="tablist"
                >
                  {this.state.courses &&
                    this.state.courses.map((course, index) => (
                      <li key={course.id} className="nav-item">
                        <a
                          className={
                            this.state.currentView === course.name
                              ? "active nav-link"
                              : "nav-link"
                          }
                          id={index}
                          data-toggle="pill"
                          href="#?"
                          onClick={this.loadAssignment}
                        >
                          {/* Course Name */}
                          {course.name}
                          {_util.loadIconBySubject(course.name) ? (
                            <img
                              src={_util.loadIconBySubject(course.name)}
                              className="subjectIcon"
                              id={index}
                            />
                          ) : (
                            ""
                          )}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="tabcontent col-12">
            {isLoading ? (
              <img src={_util.loaderRandomGifs()} className="loaderIcon" />
            ) : (
              ""
            )}
            {this.state.isTeacherLogin ? (
              <Modal
                show={this.state.showTeacherModal}
                backdrop="static"
                keyboard={false}
                centered={true}
              >
                <Modal.Header>
                  <Modal.Title>Additional Permissions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Welcome! You are identified as Teacher. Please approve, to
                  present you additional Permissions!
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button
                    variant="secondary"
                    onClick={this.handleTeacherDialogClose}
                  >
                    I Reject!
                  </Button> */}
                  <Button
                    variant="primary"
                    onClick={this.handleTeacherConfirmation}
                  >
                    Yes, I Approve!
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : (
              ""
            )}

            {/* {this.state.isTeacherLogin && !this.state.hasTeacherAccepted ? (
              <div className="col-12">
              <button
                type="button"
                className="btn btn-primary turnin"
                onClick={this.handleTeacherConfirmation}
              >
                <i className="fas fa-check"></i> Please present me additional Permissions.
              </button>
              </div>
            ) : (
              ""
            )} */}
            <Accordion
              allowZeroExpanded={true}
              onChange={(e) => this.setState({ openedItems: e })}
              preExpanded={this.state.openedItems}
            >
              <Fragment>
                {this.state.assignments &&
                  this.state.assignments.map((assignment, i) => (
                    <AccordionItem key={assignment.id} uuid={assignment.id}>
                      <Fragment>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <div className="row">
                              <div className="float-left col-12 exercisetitle">
                                {assignment.title
                                  ? assignment.title
                                  : "No Exercise Data"}
                                <small className="text-muted float-right">
                                  {/* TODO: Proper DateFormat*/}
                                  {assignment.dueDate
                                    ? "Due Date " +
                                      assignment.dueDate.day +
                                      "." +
                                      assignment.dueDate.month +
                                      "." +
                                      assignment.dueDate.year +
                                      ",  Time: " +
                                      assignment.dueTime.hours +
                                      ":" +
                                      assignment.dueTime.minutes
                                    : ""}
                                </small>
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="card-body">
                            <div className="row float-right">
                              {this.getSubmissionTurnInState(
                                assignment.courseId,
                                assignment.id
                              )}
                              <button
                                type="button"
                                className="btn btn-primary turnin"
                                onClick={() =>
                                  this.handleSubmissionTurnIn(
                                    assignment.courseId,
                                    assignment.id,
                                    this.state.submissionId
                                  )
                                }
                              >
                                <i className="fas fa-check"></i>{" "}
                                {this.state.turnInState}
                              </button>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <b>Exercise Instructions</b>
                                {assignment.description ? (
                                  <ul>{assignment.description}</ul>
                                ) : (
                                  ""
                                )}
                                {this.extractMaterials(assignment.materials)}
                                {this.state.material.formUrls &&
                                  this.state.material.formUrls.map(
                                    (formUrl) => (
                                      <ul>
                                        <iframe
                                          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                          src={formUrl}
                                          width="100%"
                                          height="700"
                                          allowtransparency="true"
                                          frameBorder="0"
                                        ></iframe>
                                      </ul>
                                    )
                                  )}
                              </div>
                              <div className="col-12">
                                <b>Exercise Audio/ Video Explanation</b>
                                {/* <div className="col-6"> */}
                                {this.state.material.youtubeVideos &&
                                  this.state.material.youtubeVideos.map(
                                    (youtube) =>
                                      youtube ? (
                                        <Video
                                          id={youtube.id}
                                          name={youtube.title}
                                          thumbnailUrl={youtube.thumbnailUrl}
                                        />
                                      ) : (
                                        ""
                                      )
                                  )}
                              </div>
                              <div className="col-12">
                                <Interaction
                                  userName={this.state.userName}
                                  courseId={assignment.courseId}
                                  subjectName={assignment.title}
                                />
                              </div>
                              {/* </div> */}
                            </div>
                            <div className="card card-body fileblock row">
                              <div className="col-12">
                                {this.state.material.exerciseDetails &&
                                  this.state.material.exerciseDetails.map(
                                    (exerciseDetail) =>
                                      exerciseDetail
                                        ? ((hasDriveFiles = true),
                                          (
                                            <FileUpload
                                              exerciseDetails={exerciseDetail}
                                              userName={this.state.userName}
                                              courseId={assignment.courseId}
                                              assignmentId={assignment.id}
                                            />
                                          ))
                                        : ""
                                  )}
                                {!hasDriveFiles ? (
                                  <FileUpload
                                    exerciseDetails={""}
                                    userName={this.state.userName}
                                    courseId={assignment.courseId}
                                    assignmentId={assignment.id}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="col-12">
                                {/* {this.state.formUpload} */}
                              </div>
                            </div>
                          </div>
                        </AccordionItemPanel>
                      </Fragment>
                    </AccordionItem>
                  ))}
              </Fragment>
            </Accordion>
          </div>
        </div>
      </Fragment>
    );
  }
}
