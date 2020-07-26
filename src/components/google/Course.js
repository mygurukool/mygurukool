/* global gapi */
import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as _util from "../util/utils";
import "@fortawesome/fontawesome-free/css/all.css";
import {REACT_APP_GOOGLE_OAUTH_TUTOR_SCOPES} from "../util/gConsts"
import { ACCESS_TOKEN } from "../util/constants";
import {Modal, Button} from "react-bootstrap";
import * as _classworkUtil from "./ClassworkUtil";
import Assignment from "./Assignment"

let user;
 
export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: "",
      coursesCompleteList: "",
      assignments: "",
      userName: "",
      currentView: "",
      turnInState: "Unknown",
      submissionId: "",
      showTeacherModal: true,
      isTeacherLogin: false,
      hasTeacherAccepted: true,
      isLoading: false,
      isAssignmentsViewStale: true,
      selectedCourseId:"",
    };
     this.child = React.createRef();
  }

  handleTeacherDialogClose = () => {this.setState({showTeacherModal: false, hasTeacherAccepted: false})};

  handleTeacherConfirmation = () => {
    sessionStorage.setItem("hasTeacherAccepted", true);
    this.setState({
      showTeacherModal: false, hasTeacherAccepted: true});
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

  componentDidMount() { 
    this.setState({isLoading: true});

    //loading user profile
    _classworkUtil.userProfile().then((response) => {
      user = response;
    });

    //loading subjects
    _classworkUtil.loadSubjects(this.props.isActive).then((subjectRes) => {
      console.log("Course.componentDidMount.userProfile: ", subjectRes);
      this.setState({isLoading: false, coursesCompleteList: subjectRes});     
      user.group = _classworkUtil.fetchGroupList(subjectRes);
     
      //now set the user data to callback object(userData)
      this.props.userData(user);

      this.fetchCoursesToDisplay(user.group[0]);
      if (this.state.courses.length > 0 && this.state.courses[0].hasOwnProperty("teacherFolder")) 
        _classworkUtil.isTeacher(user.id, this.state.courses[0].id).then((resTeacher) =>{
                if(resTeacher && this.props.isActive)
                  this.setState({isTeacherLogin: true});
        });
    });
  }

  fetchCoursesToDisplay(groupName){
    this.setState({courses: _classworkUtil.coursesByGroupName(this.state.coursesCompleteList, groupName), isAssignmentsViewStale: true});
  }

  loadAssignment = (event) => {
    this.setState({
      currentView: this.state.courses[event.target.id].name, selectedCourseId:this.state.courses[event.target.id].id});
    this.setState({isAssignmentsViewStale: false}, 
      this.awaitAndLoadAssignments
     );
  }

  awaitAndLoadAssignments = () => {
    const { isAssignmentsViewStale } = this.state;
    if(!isAssignmentsViewStale)
    this.child.loadAssignment(this.state.selectedCourseId, this.state.isTeacherLogin);
  }

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
            {this.state.isLoading ? (
              <img src={_util.loaderRandomGifs()} className="loaderIcon" />
            ) : (
              ""
            )}
            {this.state.isTeacherLogin && !sessionStorage.getItem("hasTeacherAccepted") ? (
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
                  present you additional Permissions and Authorize MyGuruKool App to facilitate you with access control to all your Google Classroom Courses!
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
            {!this.state.isAssignmentsViewStale ?
            <Assignment ref={instance => { this.child = instance; }}/> : ""}
           </div>
        </div>
      </Fragment>
    );
  }
}
