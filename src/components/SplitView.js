import React from "react";
import styled from "styled-components";
import { Component } from "react";
import SplitPane from "react-split-pane";
import Student from "./Student";
import Communication from "./Communication";
import Header from "./Header";
import * as _apiUtils from "./util/AxiosUtil";

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

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
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
  //   .Pane1 {
  //     background-color: blue;
  //   }
  //   .Pane2 {
  //     background-color: red;
  //   }
`;

class SplitView extends Component {
  constructor() {
    // alert("SplitView.constructor");
    super();
    this.toggleBtmHeight = this.toggleBtmHeight.bind(this);
    this.state = {
      studentData: null,
    };
  }
  componentWillMount() {
    // alert("SplitView.componentWillMount");
    this.setState({
      btmHeight: "",
      showCommPane: false,
      splitPercentage: "100%",
      studentData: null,
    });
    //Fetch user Profile
    _apiUtils
      .userProfile()
      .then((response) => {
        // alert("SplitView.userProfile response.data  " + response.data);
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
      })
      .catch((error) => {
        console.log(error);
      });
    // alert("SplitView.studentData " + this.state.studentData);
  }
  componentDidMount() {
    // alert("SplitView.componentDidMount");
    // this.state.isLoading = true;
    // //Fetch user Profile
    // _apiUtils.userProfile().then((response) => {
    //   this.setState({
    //     studentData: response.data,
    //   });
    //   this.setState({
    //     displayName: this.state.studentData.displayName.replace("/", " "),
    //     groupName: this.state.studentData.department,
    //   });
    //   localStorage.setItem(
    //     "studentName",
    //     this.state.studentData.displayName.replace("/", "_")
    //   );
    // });
  }

  toggleBtmHeight(newSize) {
    this.setState({ btmHeight: newSize + "px" });
  }
  render() {
    return (
      <Wrapper>
        <Header isSignedIn={true} />
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-primary" role="alert">
                <span>
                  {/* Student name */}
                  {this.state.displayName} ({this.state.groupName})
                </span>
                <ul className="navbar-nav float-right">
                  <li className="nav-item">
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
                      }}
                    >
                      <i className="far fa-comments"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <SplitPane
          split="vertical"
          defaultSize={this.state.splitPercentage}
          onChange={(size) => this.toggleBtmHeight(size)}
        >
          <Student studentData={this.state.studentData} />
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
export default SplitView;
