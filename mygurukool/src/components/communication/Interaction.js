import React, { Component, Fragment } from "react";
import SplitPane from "react-split-pane";
import { Scrollbars } from "react-custom-scrollbars";
import { Wrapper } from "../util/Wrapper";
import Comments from "./Comments";
import Audio from "./Audio";
import "../../scss/customScroll.css";
export default class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageBlock: false,
      btmHeight: "",
      splitPercentage: "100%",
      interactionTimeout: 9000, //_constant.MESSAGE_WINDOW_TIMEOUT,
    };
    this.toggleBtmHeight = this.toggleBtmHeight.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.resetTimeOut = this.resetTimeOut.bind(this);
  }

  toggleBtmHeight(newSize) {
    this.setState({ btmHeight: newSize + "px" });
  }

  cancelClick = (event) => {
    //alert("cancelClick");
    this.setState({
      showMessageBlock: false,
    });
    // console.log(this.state.messageList);
  };

  startTimeOut(v) {
    this.state.interactionTimeout = setTimeout(() => {
      this.setState({ showMessageBlock: false });
    }, v);
    return false;
  }

  resetTimeOut = (reset) => {
    if (reset) {
      //this.state.interactionTimeout = 19000;
      // alert("resetTimeOut " + this.state.interactionTimeout);
      clearTimeout(this.state.interactionTimeout);
      this.startTimeOut(19000);
    }
  };

  render() {
    return (
      <Comments
        // userName={this.props.userName}
        // courseId={this.props.courseId}
        user={this.props.user}
        subjectName={this.props.subjectName}
        resetTimeout={this.resetTimeOut}
        isActive={this.props.isActive}
      />
      // <Wrapper>
      //   <div>
      //     <button
      //       type="button"
      //       className="btn btn-primary turnin"
      //       onClick={() => this.setState({ showMessageBlock: true })}
      //     >
      //       <i className="fas fa-question-circle"></i> Feel free to ask!!
      //     </button>
      //     {this.state.showMessageBlock === true ? (
      //     <div className="row-12">
      //       {this.startTimeOut(5000)}
      //       <SplitPane
      //         className="crazy-scroll"
      //         split="vertical"
      //         defaultSize={this.state.splitPercentage}
      //         onChange={(size) => this.toggleBtmHeight(size)}
      //       >
      //         <div>
      //           <Comments
      //             userName={this.props.user.name}
      //             resetTimeout={this.resetTimeOut}
      //           />
      //         </div>
      //         {/* {"Audio here"} */}
      //         <div>
      //           <Audio />
      //         </div>
      //       </SplitPane>
      //       <button
      //         type="button"
      //         onClick={() => this.setState({ showMessageBlock: false })}
      //         className="btn btn-danger float-right"
      //       >
      //         <i className="far fa-times-circle"></i> Close Interaction
      //       </button>
      //       <br />
      //     </div>
      //     // {/* ) : (
      //     //   ""
      //     // )} */}
      //   </div>
      // </Wrapper>
    );
  }
}
