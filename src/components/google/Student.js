import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "../FileUpload";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/HashLoader";
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
              <ClipLoader
                css={override}
                size={30}
                color={"#D77F36"}
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
                                  {/* {exe.content ? ( */}
                                  <FileUpload
                                    exerciesDetails="{exe.content}"
                                    groupData="{this.state.groupDetails.id}"
                                    subjectName="{this.state.currentView}"
                                    title="{exe.title}"
                                    studentDetails="{this.state.studentData}"
                                  />
                                  {/* ) : (
                                    ""
                                  )} */}
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
