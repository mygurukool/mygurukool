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
import * as _classworkUtil from "./ClassworkUtil";


let user;
 
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
      isLoading: false,
    };
     this.extractMaterials = this.extractMaterials.bind(this);
  }

  getSubmissionTurnInState(courseId, assignmentId) {
    // _apiUtils.googleClassroomGetCourseworkSubmissions(courseId, assignmentId).then((response) => {
    //     let state      = response.data.studentSubmissions[0].state
    //     let submission = response.data.studentSubmissions[0].id

    //     if (this.state.turnInState  !== state)      { this.setState({ turnInState:  state}) }
    //     if (this.state.submissionId !== submission) { this.setState({ submissionId: submission}) }
    // })
  }

  handleSubmissionTurnIn(courseId, assignmentId, submissionId) {
    //_apiUtils.googleClassroomSubmissionTurnIn(courseId, assignmentId, submissionId).then((response) => {
    //  this.getSubmissionTurnInState(courseId, assignmentId)
    //})
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

  loadAssignment(courseId, isTeacherLogin) {
    this.setState({isLoading: true});
    _classworkUtil.loadAssignments(courseId, isTeacherLogin).then((response) =>{
      this.setState({assignments: response, isLoading: false});
      console.log(response)
    })
  }

  render() {
    let hasDriveFiles = false;
    return (
      <Fragment>
          <div className="tabcontent col-12">
            {this.state.isLoading ? (
              <img src={_util.loaderRandomGifs()} className="loaderIcon" />
            ) : (
              ""
            )}

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
                                disabled={!this.props.isActive}
                                onClick={() =>this.handleSubmissionTurnIn(
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
                                  userName={this.props.userName}
                                  courseId={assignment.courseId}
                                  subjectName={assignment.title}
                                  isActive={this.props.isActive}
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
                                              userName={this.props.userName}
                                              courseId={assignment.courseId}
                                              assignmentId={assignment.id}
                                              isActive={this.props.isActive}
                                            />
                                          ))
                                        : ""
                                  )}
                                {!hasDriveFiles ? (
                                  <FileUpload
                                    exerciseDetails={""}
                                    userName={this.props.userName}
                                    courseId={assignment.courseId}
                                    assignmentId={assignment.id}
                                    isActive={this.props.isActive}
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
      </Fragment>
    );
  }
}
