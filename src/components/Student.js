import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import FileUpload from "./FileUpload";
import axios from "axios";
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
import maths from "./../assets/maths.gif";
import maths2 from "./../assets/maths2.png";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-free/css/all.css";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import stripHtml from "string-strip-html";
// import parse from 'html-react-parser';
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

    this.state = {
      studentData: null,
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
    };

    this.axiosCall = this.axiosCall.bind(this);
    this.displaySubjectIconByName = this.displaySubjectIconByName.bind(this);
  }
  componentDidMount() {
    this.state.isLoading = true;
    //Fetch user Profile
    this.axiosCall(
      // "https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/1-9e7210a1-77c7-4b10-8a1b-ab0fb4a9f4dd/sectionGroups"
      process.env.REACT_APP_GRAPH_API_URL_BETA + "/me"
    ).then((response) => {
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

      this.axiosCall(
        process.env.REACT_APP_GRAPH_API_URL +
          "sites/root:/sites/" +
          this.state.groupName
      ).then((response) => {
        this.setState({ groupDetails: response.data });

        this.axiosCall(
          // `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/${this.state.studentData.value[0].id}/sections`
          process.env.REACT_APP_GRAPH_API_URL +
            `sites/${
              this.state.groupDetails.id
            }/onenote/sections?$filter=contains(parentSectionGroup/displayName,'${this.state.studentData.displayName.replace(
              "/",
              "_"
            )}')`
        ).then((response) => {
          this.state.isLoading = false;
          this.setState({ sections: response.data });
          {
            this.axiosCall(
              process.env.REACT_APP_GRAPH_API_URL +
                `sites/${this.state.groupDetails.id}/onenote/sections/${this.state.sections.value[0].id}/pages`
              // `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${this.state.sections.value[0].id}/pages`
            ).then((response) => {
              this.setState({
                currentView: this.state.sections.value[0].displayName,
              });
              this.setState({
                exercise: response.data,
                exercisedata: this.state.exercise,
              });
            });
          }
        });
      });
      // console.log(this.state.groupDetails.id);
      console.log(
        process.env.REACT_APP_GRAPH_API_URL +
          "/sites/" +
          this.state.groupDetails.id +
          "/onenote/sectionGroups/"
      );
    });
  }

  axiosCall(url) {
    return axios.get(url, {
      params: {},
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  handleNotebook = (event) => {
    return (
      <iframe
        width="500"
        height="200"
        frameborder="0"
        scrolling="no"
        src="https://something.sharepoint.com/personal/something/_layouts/15/WopiFrame.aspx?sourcedoc=something&action=embedview&wdbipreview=true"
      ></iframe>
    );
  };

  handleClick = (event) => {
    this.setState({ currentView: event.target.text });
    this.state.isLoading = true;
    this.axiosCall(
      process.env.REACT_APP_GRAPH_API_URL +
        `sites/${this.state.groupDetails.id}/onenote/sections/${event.target.id}/pages`
      // `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${event.target.id}/pages`
    ).then((response) => {
      this.state.isLoading = false;
      this.setState({ exercise: response.data });
      {
        this.state.exercise &&
          this.state.exercise.value.map((exe, i) =>
            this.axiosCall(exe.contentUrl).then((response) => {
              axios
                .post(process.env.REACT_APP_WEBSERVER + "/mygurukool.php", {
                  data: response.data,
                })
                .then((res) => {
                  this.state.exercise.value[i].content = res.data;
                  this.setState({ exercisedata: this.state.exercise });
                  console.log(this.state.exercisedata);
                });
            })
          );
      }
    });
    return false;
  };

  displaySubjectIconByName(subjectName, targetId) {
    this.state.subjectIcon = "";
    if (subjectName.includes("Math")) {
      this.state.subjectIcon = maths;
    } else if (subjectName === "German") {
      this.state.subjectIcon = maths2;
    } else {
      return "";
    }
    return (
      <img
        src={this.state.subjectIcon}
        id={targetId}
        className="subjectIcon"
        onClick={this.handleClick}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-primary" role="alert">
                <span>
                  {/* Student name */}
                  {this.state.displayName}
                </span>
                <ul className="navbar-nav float-right">
                  <li className="nav-item">
                    <i className="far fa-comments"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row sub-excer-section">
              <div className="col-12">
                <ul
                  className="nav nav-pills mb-3 sub-nav"
                  id="pills-tab"
                  role="tablist"
                >
                  {this.state.sections &&
                    this.state.sections.value.map((key, i) => (
                      <li className="nav-item">
                        <a
                          className={
                            this.state.currentView == key.displayName
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
                  <div>
                        <iframe
                          width="500"
                          height="200"
                          frameborder="0"
                          scrolling="no"
                          src="https://something.sharepoint.com/personal/something/_layouts/15/WopiFrame.aspx?sourcedoc=something&action=embedview&wdbipreview=true"
                        ></iframe>
                      </div> */}
                  {/* <br />
                      {this.displaySubjectIconByName(key.displayName, key.id)} */}
                  {/* </a>
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
            <Accordion allowZeroExpanded={true}>
              {this.state.exercisedata &&
                this.state.exercisedata.value.map((exe, i) => (
                  <AccordionItem>
                    {exe.title ? (
                      <Fragment>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <div className="row">
                              <div className="float-left col-12 exercisetitle">
                                {exe.title
                                  ? (this.state.exerciseTitle = exe.title)
                                  : "No Exercise Data"}
                                <small class="text-muted float-right">
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
                                  <i class="fas fa-check"></i> Turn In
                                </button>
                              </div>
                              <div className="col-12">
                                {/* {exe.content ? (
                                  <AudioVideo
                                    vidUrl={exe.content.youtubelink}
                                  />
                                ) : (
                                  ""
                                )} */}
                                <b>Exercise Audio/ Video Explanation</b>
                                <ul>
                                  {exe.content ? (
                                    <Video vidData={exe.content} />
                                  ) : (
                                    ""
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="card card-body fileblock row">
                              <div class="col-12">
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
                              <div class="col-12">{this.state.formUpload}</div>
                            </div>
                          </div>
                        </AccordionItemPanel>
                      </Fragment>
                    ) : (
                      <h5>
                        Hurrayyy! You have finished all your assignments of this
                        subject
                      </h5>
                    )}
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </Fragment>
    );
  }
}
