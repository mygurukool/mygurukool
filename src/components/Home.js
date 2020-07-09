import React from "react";
import { Component } from "react";
import SplitPane from "react-split-pane";
import Classwork from "./Classwork";
import Conference from "./communication/Conference";
import Header from "./Header";
// import CustomScroll from "react-custom-scroll";
// import "../scss/customScroll.css";
import { Scrollbars } from "react-custom-scrollbars";
import * as _constants from "./util/constants";
import { Wrapper } from "./util/Wrapper";

class Home extends Component {
  constructor() {
    super();
    this.toggleBtmHeight = this.toggleBtmHeight.bind(this);
    this.state = {
      userData: null,
      cssContainer: "container",
    };
    this.handleUserData = this.handleUserData.bind(this);
    this.handleConferencePanelSize = this.handleConferencePanelSize.bind(this);
  }
  componentWillMount() {
    this.setState({
      btmHeight: "",
      showConfPane: false,
      splitPercentage: "100%",
    });
    if (
      sessionStorage.getItem(_constants.LOGIN_PROVIDER) === _constants.GOOGLE
    ) {
      let tempProfile = {
        displayName: this.props.location,
        department: sessionStorage.getItem("google_profile"),
      };
      this.setState({ userData: tempProfile });
    }
  }

  handleUserData = (userData) => {
    this.setState({
      userData: userData,
    });
  };

  handleConferencePanelSize = (resize) => {
    //Conference Pane
    //=> resize: -1:close window; 0:minimize(50%); 1:maximize(100%)
    let size = "50%"; //resize === 0
    let keepConfPaneOpen = true;
    if (resize === 1) {
      size = "0%";
    } else if (resize === -1) {
      size = "100%";
      keepConfPaneOpen = false;
    }
    this.setState({
      splitPercentage: size,
      showConfPane: keepConfPaneOpen,
    });
    keepConfPaneOpen
      ? (this.state.cssContainer = "container-conference")
      : (this.state.cssContainer = "container");
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
            this.state.userData ? this.state.userData.displayName : "User"
          }
        />
        <div className={this.state.cssContainer}>
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-primary" role="alert">
                <span>
                  {/* Group Name*/}
                  <b>
                    {this.state.userData
                      ? `Group: ${this.state.userData.department}`
                      : "Group Name"}
                  </b>
                </span>
                <ul className="float-right">
                  {/* <ul className="navbar-nav float-right"> */}
                  {/* <li className="nav-item"> */}
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        this.handleConferencePanelSize(
                          //At this location
                          // "showConfPane is False"
                          //        =>Vid conference is open (next action: setInactive=> pane 1: 100%/ -1 )
                          // "showConfPane is True"
                          //        => Vid conference is inactive (next action: setInactive=> pane 1: 50%/ 0 )
                          !this.state.showConfPane ? 0 : -1
                        )
                      }
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
            <Classwork userData={this.handleUserData} />
            {/* <Student userData={this.handleUserData} /> */}
          </Scrollbars>
          {/* <CustomScroll allowOuterScroll={true} flex="1">
            <Student userData={this.handleUserData} />
          </CustomScroll> */}
          {this.state.showConfPane ? (
            <Conference
              paneMaximize={this.handleConferencePanelSize}
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
