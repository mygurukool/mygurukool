import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "../FileUpload";
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
import * as _constants from "../util/constants";
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
    };
    this.loadAssignment = this.loadAssignment.bind(this);
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
    let aStudentName = this.state.studentName; // -- damn hack..!
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
                        this.state.courses.map((course) => (
                          <Tab>
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
              <Accordion allowZeroExpanded={true}>
                {/* //TODO: Dummy map iteration to refresh display of second tab ..  */}
                {this.state.assignments &&
                  this.state.assignments.map(() => (
                    <TabPanel>
                      {this.state.assignments.map((assignment) => (
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
                                  {assignment.materials &&
                                    assignment.materials.map((material) =>
                                      material && material.form ? (
                                        <ul>
                                          <iframe
                                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                            src={material.form.formUrl}
                                            width="100%"
                                            height="700"
                                            allowtransparency="true"
                                            frameborder="0"
                                          ></iframe>
                                        </ul>
                                      ) : (
                                        ""
                                      )
                                    )}
                                </div>
                                <div className="col-12">
                                  <b>Exercise Audio/ Video Explanation</b>
                                  <ul>
                                    {assignment.materials &&
                                      assignment.materials.map((material) =>
                                        material && material.youtubeVideo ? (
                                          <Video
                                            id={material.youtubeVideo.id}
                                            name={material.youtubeVideo.title}
                                            thumbnailUrl={
                                              material.youtubeVideo.thumbnailUrl
                                            }
                                          />
                                        ) : (
                                          ""
                                        )
                                      )}
                                  </ul>
                                </div>
                              </div>

                              <div className="card card-body fileblock row">
                                <div className="col-12">
                                  {assignment.materials &&
                                    assignment.materials.map(function (
                                      material
                                    ) {
                                      if (material && material.driveFile) {
                                        //TODO: should be removed once google/ ms student class is sync
                                        // filetype will not be filled as google doesnt have an option of *BLOB* to download
                                        let tempExerciseDetails = {
                                          filename: "",
                                          filetype: "",
                                          filelink: "",
                                          fileThumbnailLink: "",
                                        };

                                        tempExerciseDetails.filename =
                                          material.driveFile.driveFile.title;
                                        tempExerciseDetails.filelink =
                                          material.driveFile.driveFile.alternateLink;
                                        tempExerciseDetails.fileThumbnailLink =
                                          material.driveFile.driveFile.thumbnailUrl;

                                        return (
                                          <FileUpload
                                            exerciesDetails={
                                              tempExerciseDetails
                                            }
                                            subjectName={aStudentName}
                                            studentName={aStudentName}
                                            courseId={assignment.courseId}
                                            assignmentId={assignment.id}
                                          />
                                        );
                                      }
                                      return "";
                                    })}
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
                  ))}
              </Accordion>
            </div>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}
