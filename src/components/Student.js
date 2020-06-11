import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "./FileUpload";
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
import Video from "./Video";
import * as _util from "./util/utils";
import * as _apiUtils from "./util/AxiosUtil";
import "@fortawesome/fontawesome-free/css/all.css";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const cb = ({
  tag,
  deleteFrom,
  deleteTo,
  insert,
  rangesArr,
  proposedReturn,
}) => {
  // default action which does nothing different from normal, non-callback operation
  rangesArr.push(deleteFrom, deleteTo, insert);
  // you might want to do something different, depending on "tag" contents.
};
export default class Student extends Component {
  constructor(props) {
    super(props);
    // alert("Student.constructor");

    this.state = {
      studentData: props.studentData,
      displayName: "",
      sections: "",
      tabIndex: 0,
      exercise: "",
      exercisedata: "",
      isLoading: false,
      formUpload: "",
      currentView: "",
      isOpen: false,
      vidId: "",
      exerciseTitle: "",
      groupDetails: "",
      groupName: "",
      subjectIcon: "",
      expand: true,
      openedItems: [],
      showNotebook: false,
      showVideoConference: false,
    };
    this.displaySubjectIconByName = this.displaySubjectIconByName.bind(this);
    this.addToList = this.addToList.bind(this);
    this.addExerciseToList = this.addExerciseToList.bind(this);
  }

  addExerciseToList(id, displaySubjectIconByName) {
    // this.setState((state) => {
    //   const sections = state.exercisedata.concat({
    //     id: id,
    //     displayName: displaySubjectIconByName,
    //   });
    //   return {
    //     sections,
    //   };
    // });
  }

  addToList(id, displaySubjectIconByName) {
    this.setState((state) => {
      const sections = state.sections.concat({
        id: id,
        displayName: displaySubjectIconByName,
      });
      return {
        sections,
      };
    });
  }

  componentDidMount() {
    // alert("Student.componentDidMount");
    this.state.isLoading = true;
    // alert("Student: " + this.state.studentData.displayName);

    //Fetch user Profile (to be deleted when loading sequence is resolved, currently fetching more than once )
    _apiUtils.userProfile().then((response) => {
      this.setState({
        studentData: response.data,
      });
      this.setState({
        displayName: this.state.studentData.displayName.replace("/", " "),
        groupName: this.state.studentData.department,
      });
      localStorage.setItem(
        "studentName",
        this.state.studentData.displayName.replace("/", "_")
      );
      _apiUtils.loadSite(this.state.groupName).then((response) => {
        this.setState({ groupDetails: response.data });

        _apiUtils
          .loadSubjects(
            this.state.groupDetails.id,
            this.state.studentData.displayName
          )
          .then((response) => {
            this.state.isLoading = false;
            this.setState({ sections: response.data.value });
            this.addToList("VideoConferenceTab", "Inbuilt VideoConference");
            {
              this.setState({
                currentView: this.state.sections[0].displayName,
              });
              _apiUtils
                .loadAssignments(
                  this.state.groupDetails.id,
                  this.state.sections[0].id
                )
                .then((response) => {
                  this.setState({
                    currentView: this.state.sections[0].displayName,
                  });
                  this.setState({
                    exercise: response.data,
                    exercisedata: this.state.exercise,
                  });
                });
            }
          });
      });
    });
  }

  handleClick = (event) => {
    if (event.target.text === "Inbuilt VideoConference") {
      this.setState({ showVideoConference: true });
      this.setState({ showNotebook: false });
    } else {
      this.setState({ showVideoConference: false });
      this.setState({ showNotebook: false });
      console.log(this.state.expand);
      this.setState({ expand: false, openedItems: [] });
      this.setState({ currentView: event.target.text });
      this.state.isLoading = true;
      _apiUtils
        .loadAssignments(this.state.groupDetails.id, event.target.id)
        .then((response) => {
          this.state.isLoading = false;
          this.setState({ exercise: response.data });
          /*Sort by due date */
          {
            let sortedExercises =
              response.data &&
              response.data.value.sort((a, b) => {
                return (
                  new Date(a.submissionDate).getTime() -
                  new Date(b.submissionDate).getTime()
                );
              });
            console.log("sortedExercises: " + sortedExercises);
          }

          {
            this.state.exercise &&
              this.state.exercise.value.map((exe, i) =>
                _apiUtils
                  .loadAssignmentPage(exe.contentUrl)
                  .then((response) => {
                    this.state.exercise.value[
                      i
                    ].content = _util.parseOneNotePage(response);
                    this.setState({ exercisedata: this.state.exercise });
                    // this.addExerciseToList("exercisedata", "exercisedata");
                  })
              );
          }
        });
    }
    return false;
  };

  displaySubjectIconByName(subjectName, targetId) {
    let subjectIcon = _util.loadIconBySubject(subjectName);
    //if iconFound
    if (subjectIcon.trim() !== "") {
      //alert(this.setState.subjectIcon + " .. targetId:" + targetId);
      return (
        <img
          src={subjectIcon}
          id={targetId}
          className="subjectIcon"
          onClick={this.handleClick}
        />
      );
    }
  }

  render() {
    //console.log(this.state.openedItems);
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
                  {this.state.sections &&
                    this.state.sections.map((key, i) => (
                      <li key={key.id} className="nav-item">
                        <a
                          className={
                            this.state.currentView === key.displayName
                              ? "active nav-link"
                              : "nav-link"
                          }
                          id={key.id}
                          data-toggle="pill"
                          href="#?"
                          onClick={this.handleClick}
                        >
                          {/* Exercise Name */}
                          {key.displayName}
                          <br />
                          {this.displaySubjectIconByName(
                            key.displayName,
                            key.id
                          )}
                        </a>
                      </li>
                    ))}
                  {/* Embed OneNote */}
                  {/* <li className="nav-item">
                    <a
                      className={"nav-link"}
                      id={"oneNote"}
                      data-toggle="pill"
                      href="#?"
                      onClick={this.handleNotebook}
                    > */}
                  {/* Exercise Name */}
                  {/* Notebook
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="tabcontent col-12">
            <ClipLoader
              css={override}
              size={30}
              color={"#D77F36"}
              loading={this.state.isLoading}
            />
            {/* <Accordion allowZeroExpanded={true} className="testing-color-green"> */}
            <Accordion
              allowZeroExpanded={true}
              onChange={(e) => this.setState({ openedItems: e })} //
              preExpanded={this.state.openedItems}
            >
              {this.state.showVideoConference ? (
                <div>
                  Video Conference
                  <button onClick={this.closeConf}>Quit Conference</button>
                  <iframe
                    width="100%"
                    height="600"
                    frameborder="0"
                    scrolling="no"
                    //src="https://riot.im/app/#/room/!bScanHsKZTWQPNFXbg:matrix.org"
                    src="https://meet.jit.si/GuruKoolSchoolVideoConference"
                  ></iframe>
                </div>
              ) : (
                <Fragment>
                  {this.state.exercisedata &&
                    this.state.exercisedata.value.map((exe, i) => (
                      <AccordionItem key={exe.id} uuid={exe.id}>
                        {exe.title ? (
                          <Fragment>
                            <AccordionItemHeading>
                              <AccordionItemButton>
                                <div className="row">
                                  <div className="float-left col-12 exercisetitle">
                                    {exe.title
                                      ? (this.state.exerciseTitle = exe.title)
                                      : "No Exercise Data"}
                                    <small className="text-muted float-right">
                                      {exe.content && exe.content.submissionDate
                                        ? exe.content.submissionDate
                                        : ""}
                                    </small>
                                  </div>
                                </div>
                              </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                              <div className="card-body">
                                <div className="row">
                                  {/* <div className="row testing-color-yellow"> */}
                                  <div className="col-8">
                                    <b>Exercise Instructions</b>
                                    <ul
                                      dangerouslySetInnerHTML={{
                                        __html: exe.content
                                          ? exe.content.instructions
                                          : "",
                                      }}
                                    ></ul>
                                  </div>
                                  <div className="col-4">
                                    <button
                                      type="button"
                                      className="btn btn-primary turnin"
                                    >
                                      <i className="fas fa-check"></i> Turn In
                                    </button>
                                  </div>
                                  <div className="col-12">
                                    <b>Exercise Audio/ Video Explanation</b>
                                    <ul>
                                      {exe.content &&
                                      exe.content.youtubelink ? (
                                        <Video vidData={exe.content} />
                                      ) : (
                                        ""
                                      )}
                                    </ul>
                                  </div>
                                </div>

                                <div className="card card-body fileblock row">
                                  <div className="col-12">
                                    <div></div>
                                    {exe.content ? (
                                      <FileUpload
                                        exerciesDetails={exe.content}
                                        groupData={this.state.groupDetails.id}
                                        subjectName={this.state.currentView}
                                        title={exe.title}
                                        studentDetails={this.state.studentData}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="col-12">
                                    {this.state.formUpload}
                                  </div>
                                </div>
                              </div>
                            </AccordionItemPanel>
                          </Fragment>
                        ) : (
                          <h5>
                            Hurrayyy! You have finished all your assignments of
                            this subject
                          </h5>
                        )}
                      </AccordionItem>
                    ))}
                  {/* {this.state.showNotebook ? (
                    <div>
                      Video Conference on Notebook Page
                      <iframe
                        width="100%"
                        height="600"
                        frameborder="0"
                        scrolling="no"
                        src="http://0.0.0.0:8080/webpack-dev-server/"
                        //src="https://meet.jit.si/testtttttttttts"
                        // src="https://something.sharepoint.com/personal/someQPrAthing/_layouts/15/WopiFrame.aspx?sourcedoc=something&action=embedview&wdbipreview=true"
                      ></iframe>
                      <button onClick={this.closeConf}>Quit Conference</button>
                    </div>
                  ) : (
                    ""
                  )} */}
                </Fragment>
              )}
            </Accordion>
          </div>
        </div>
      </Fragment>
    );
  }
}
