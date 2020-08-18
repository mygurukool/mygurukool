import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as _util from "../util/utils";
import "@fortawesome/fontawesome-free/css/all.css";
import * as _classworkUtil from "./ClassworkUtil";
import Assignment from "./Assignment"
import FloatingButton from "../util/FloatingButton";
import CreateCourseWork from "../CreateCourseWork";
import TeacherAuthorization from "./TeacherAuthorization";
import {HAS_TEACHER_ACCEPTED} from "../util/constants";
import {COURSE_ID} from "../util/constants"
import InvitePeople from "./InvitePeople";

/**
 * User Object structure, this must be update appropriately
 * user: {id, name, group, selectedCourseId, isTeacherLogin}
 */
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
      isTeacherLogin: false,
      isLoading: false,
    //  isAssignmentsViewStale: true,  //TODO: used along with *refs* 
      selectedCourseId:"null",
      showAssignments: false,
    };
     this.child = React.createRef();
  }

  createCourseWorkClick = async (showCreateCourseWork) => {
    this.setState({showCreateCourseWork: showCreateCourseWork, 
      selectedCourseId: this.state.selectedCourseId,
      showAssignments: !this.state.showAssignments,
    });
  }

  showInvitePeople = (showInvitePeople) => {
    this.setState({showInvitePeople: showInvitePeople, 
      selectedCourseId: this.state.selectedCourseId,
      showAssignments: !this.state.showAssignments,
    });
  }

  async componentDidMount() { 
    let isTeacherLogin = false;
    sessionStorage.setItem(COURSE_ID, this.state.selectedCourseId);
    this.setState({isLoading: true});

    //loading user profile
    _classworkUtil.userProfile().then((response) => {
      user = response;
    });

    //loading subjects
    _classworkUtil.loadSubjects(this.props.isActive).then((subjectRes) => {
      console.log("Course.componentDidMount.userProfile: ", subjectRes);
      this.setState({isLoading: false, coursesCompleteList: subjectRes, });     
      user.group = _classworkUtil.fetchGroupList(subjectRes);
     
      this.fetchCoursesToDisplay(user.group[0]);
      if (this.state.courses.length > 0 && this.state.courses[0].hasOwnProperty("teacherFolder")) 
        _classworkUtil.isTeacher(user.id, this.state.courses[0].id).then((resTeacher) =>{
            if(resTeacher && this.props.isActive)
              isTeacherLogin = true;

            //now set the user data to callback object(userData)
            user.isTeacherLogin= isTeacherLogin;
            user.selectedCourseId = "null";
            this.props.userData(user);
            this.setState({selectedCourseId: "null", isTeacherLogin: isTeacherLogin});
          });
    });

    let invites = await _classworkUtil.getInvitations().then((response) => response);
    //alert("invites: " + JSON.stringify(invites))
  }

  async fetchCoursesToDisplay(groupName){
    sessionStorage.setItem(COURSE_ID, null);
    await this.setState({courses: _classworkUtil.coursesByGroupName(this.state.coursesCompleteList, groupName), 
      showAssignments: false,}); 
  }

  loadAssignment = (event) => {
    sessionStorage.setItem(COURSE_ID, this.state.courses[event.target.id].id);
    this.setState({
      currentView: this.state.courses[event.target.id].name, 
      showAssignments: true, showCreateCourseWork: false, selectedCourseId: this.state.courses[event.target.id].id,
    });
    user.selectedCourseId = this.state.courses[event.target.id].id;
    this.props.userData(user);
    // this.setState({isAssignmentsViewStale: false}, 
    //   this.awaitAndLoadAssignments  }
    //);
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
         {<FloatingButton         
         showCreateCourseWork={this.createCourseWorkClick} 
         showInvitePeople={this.showInvitePeople}
         isTeacherLogin={this.state.isTeacherLogin}
         selectedCourseId={this.state.selectedCourseId}
         />}
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
            {this.state.isTeacherLogin && !sessionStorage.getItem(HAS_TEACHER_ACCEPTED) ? (
              <TeacherAuthorization />
            ) : (
              ""
            )}
            
            {this.state.showCreateCourseWork ?
            <CreateCourseWork showCreateCourseWork={this.createCourseWorkClick}/>
            : ""
            }
            {this.state.showInvitePeople ?
            <InvitePeople showInvitePeople={this.showInvitePeople}/>
            : ""
            }
            {this.state.showAssignments?
            <Assignment
              // courseId={this.state.selectedCourseId} 
              // isTeacherLogin={this.state.isTeacherLogin} 
              user={user}
              isActive={this.props.isActive}/>
            : ""}
            {/* // This code to explicity call child function to fix the issue: Assignments view is state >>  
                //not updating with the newly selected course has no assignments
            {!this.state.isAssignmentsViewStale ?
            <Assignment ref={instance => { this.child = instance; }} isActive={this.props.isActive}/> : ""} */}
           </div>
        </div>
      </Fragment>
    );
  }
}
