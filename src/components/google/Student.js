import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "../FileUpload";
import Messaging from "../Messaging";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
// import AudioVideo from "./AudioVideo";
import Video from "../Video";
import * as _util from "../util/utils";
import * as _apiUtils from "../util/AxiosUtil";
import "@fortawesome/fontawesome-free/css/all.css";
// Demo styles, see 'Styles' section below for some notes on use.
// import "react-accessible-accordion/dist/fancy-example.css";

// let student = {
//   name,
//   group: { name, id },
//   subjects: { exercises: { exerciseTitle, exercisedata, submissionDate } },
// };
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  // background-image: url("../../assets/giraffe-icon.png");
`;
let isLoading = false;
let studentData = {
  displayName: "Name",
  department: "Group Name",
};

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: "",
      assignments: "",
      studentName: "",
      material: { formUrls: [] },
    };
    this.loadAssignment = this.loadAssignment.bind(this);
    this.extractMaterials = this.extractMaterials.bind(this);
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
            //below are, as of now not applicable for google
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
    _apiUtils
      .userProfile()
      .then((response) => {
        studentData.displayName = response.data.name;
        studentData.department = response.data.family_name;
        this.props.studentData(studentData);
        this.setState({ studentName: response.data.name });
        // load courses
        _apiUtils
          .loadGoogleSubjects()
          .then((subjectRes) => {
            isLoading = false;
            this.setState({
              courses: subjectRes.data.courses,
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

  loadAssignment(index) {
    isLoading = true;
    //TODO: course id by indexof should be replaced by courseId being attached to Tab id
    _apiUtils
      .loadGoogleAssignments(this.state.courses[index].id)
      .then((response) => {
        console.log(response.data.courseWork);
        this.setState({
          assignments: response.data.courseWork,
        });
      })
      .catch((error) => {
        console.error("Error during google userProfile:", error);
      });
    isLoading = false;
  }

  render() {
    let hasDriveFiles = false;
    console.log(hasDriveFiles + "  << ontop hasDriveFiles");
    return (
      <Fragment>
        <div className="container">
          <Tabs
            defaultIndex={0}
            onSelect={(index) => this.loadAssignment(index)}
          >
            <div className="row">
              <div className="row sub-excer-section">
                <div className="col-12">
                  <ul
                    className="nav nav-pills mb-3 sub-nav"
                    id="pills-tab"
                    role="tablist"
                  >
                    <TabList>
                      {this.state.courses &&
                        this.state.courses.map((course, i) => (
                          <Tab
                            key={course.name}
                            className="nav nav-pills mb-3 sub-nav"
                          >
                            <div className="column">{course.name}</div>
                            {_util.loadIconBySubject(course.name) ? (
                              <div className="column">
                                <img
                                  src={_util.loadIconBySubject(course.name)}
                                  className="subjectIcon"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </Tab>
                        ))}
                    </TabList>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tabcontent col-12">
              <PacmanLoader
                css={override}
                size={20}
                // color={"#D77F36"}
                color={"rgb(54, 215, 183)"}
                loading={isLoading}
              />
              {/* Loop to build TabPanel ( Count same as tabs count)  */}
              {this.state.courses &&
                this.state.courses.map(() => (
                  <Accordion allowZeroExpanded={true}>
                    <TabPanel>
                      {this.state.assignments &&
                        this.state.assignments.map((assignment, i) => (
                          <AccordionItem>
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
                                  <button
                                    type="button"
                                    className="btn btn-primary turnin"
                                  >
                                    <i className="fas fa-check"></i> Turn In
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
                                    {console.log(
                                      "assignment.title " + assignment.title
                                    )}
                                    {this.extractMaterials(
                                      assignment.materials
                                    )}
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
                                              thumbnailUrl={
                                                youtube.thumbnailUrl
                                              }
                                            />
                                          ) : (
                                            ""
                                          )
                                      )}
                                  </div>
                                  <div className="col-12">
                                    <Messaging
                                      userName={this.state.studentName}
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
                                              console.log(
                                                hasDriveFiles +
                                                  "  << hasDriveFiles"
                                              ),
                                              (
                                                <FileUpload
                                                  exerciseDetails={
                                                    exerciseDetail
                                                  }
                                                  studentName={
                                                    this.state.studentName
                                                  }
                                                  courseId={assignment.courseId}
                                                  assignmentId={assignment.id}
                                                />
                                              ))
                                            : ""
                                      )}
                                    {!hasDriveFiles
                                      ? (console.log(
                                          hasDriveFiles + "  << Single mode"
                                        ),
                                        (
                                          <FileUpload
                                            exerciseDetails={""}
                                            studentName={this.state.studentName}
                                            courseId={assignment.courseId}
                                            assignmentId={assignment.id}
                                          />
                                        ))
                                      : ""}
                                  </div>
                                  <div className="col-12">
                                    {/* {this.state.formUpload} */}
                                  </div>
                                </div>
                              </div>
                            </AccordionItemPanel>
                          </AccordionItem>
                        ))}
                    </TabPanel>
                  </Accordion>
                ))}
            </div>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}
