import React from "react";
import styled from "styled-components";
import { Component } from "react";
import SplitPane from "react-split-pane";
import Student from "./Student";
import Communication from "./Communication";
import Header from "./Header";
// import CustomScroll from "react-custom-scroll";
// import "../scss/customScroll.css";
import { Scrollbars } from "react-custom-scrollbars";

const Wrapper = styled.div`
  .Resizer {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .Pane1 {
    display: flex;
    min-height: 0;
    min-width: 100;
  }
`;

class Home extends Component {
  constructor() {
    super();
    this.toggleBtmHeight = this.toggleBtmHeight.bind(this);
    this.state = {
      studentData: null,
      cssContainer: "container",
    };
    this.handleStudentData = this.handleStudentData.bind(this);
  }
  componentWillMount() {
    this.setState({
      btmHeight: "",
      showCommPane: false,
      splitPercentage: "100%",
    });
  }

  handleStudentData = (studentData) => {
    this.setState({
      studentData: studentData,
    });
  };

  toggleBtmHeight(newSize) {
    this.setState({ btmHeight: newSize + "px" });
  }
  render() {
    return (
      <Wrapper>
        <Header
          isSignedIn={true}
          studentName={
            this.state.studentData ? this.state.studentData.displayName : "User"
          }
        />
        <div className={this.state.cssContainer}>
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-primary" role="alert">
                <span>
                  {/* Group Name*/}
                  <b>
                    {this.state.studentData
                      ? `Group: ${this.state.studentData.department}`
                      : ""}
                  </b>
                </span>
                <ul className="float-right">
                  {/* <ul className="navbar-nav float-right"> */}
                  {/* <li className="nav-item"> */}
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          showCommPane: !this.state.showCommPane,
                          splitPercentage: !this.state.showCommPane
                            ? "50%"
                            : "100%",
                        });
                        {
                          this.state.showCommPane
                            ? (this.state.cssContainer = "container")
                            : (this.state.cssContainer =
                                "container-conference");
                        }
                      }}
                    >
                      <i className="far fa-comments fa-1g"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <SplitPane
          className="crazy-scroll"
          split="vertical"
          defaultSize={this.state.splitPercentage}
          onChange={(size) => this.toggleBtmHeight(size)}
        >
          <Scrollbars>
            <Student studentData={this.handleStudentData} />
          </Scrollbars>
          {/* <CustomScroll allowOuterScroll={true} flex="1">
            <Student studentData={this.handleStudentData} />
          </CustomScroll> */}
          {this.state.showCommPane ? (
            <Communication
              // color={"red"}
              btmHorizontal
              bottomHeight={this.state.btmHeight}
            />
          ) : (
            ""
          )}
        </SplitPane>
      </Wrapper>
    );
  }
}
export default Home;
