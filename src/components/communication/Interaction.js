import React, { Component, Fragment } from "react";
import SplitPane from "react-split-pane";
import { Scrollbars } from "react-custom-scrollbars";
import { Wrapper } from "../util/Wrapper";
import Comments from "./Comments";
export default class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageBlock: false,
      btmHeight: "",
      splitPercentage: "100%",
      interactionTimeout: 5000, //_constant.MESSAGE_WINDOW_TIMEOUT,
    };
    this.toggleBtmHeight = this.toggleBtmHeight.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.resetTimeOut = this.resetTimeOut.bind(this);
  }

  toggleBtmHeight(newSize) {
    this.setState({ btmHeight: newSize + "px" });
  }

  cancelClick = (event) => {
    alert("cancelClick");
    this.setState({
      showMessageBlock: false,
    });
    // console.log(this.state.messageList);
  };

  startTimeOut() {
    setTimeout(() => {
      this.setState({ showMessageBlock: false });
    }, this.state.interactionTimeout);
    return false;
  }

  resetTimeOut(reset) {
    if (reset) this.setState({ interactionTimeout: 5000 });
  }

  render() {
    return (
      // <Wrapper>
      <div>
        <button
          type="button"
          className="btn btn-primary turnin"
          onClick={() => this.setState({ showMessageBlock: true })}
        >
          <i className="fas fa-question-circle"></i> Feel free to ask!!
        </button>
        {this.state.showMessageBlock === true ? (
          <Fragment>
            {this.startTimeOut()}
            {/* <SplitPane
                className="crazy-scroll"
                split="vertical"
                defaultSize={this.state.splitPercentage}
                onChange={(size) => this.toggleBtmHeight(size)}
              > */}
            <Comments
              userName={this.props.userName}
              // resetTimeout={this.resetTimeOut}
            />
            {/* <Scrollbars>this.commentBlock()</Scrollbars> */}
            {/* {"Audio here"} */}
            {/* </SplitPane> */}
            <button
              type="button"
              onClick={() => this.setState({ showMessageBlock: false })}
              className="btn btn-danger float-right"
            >
              <i className="far fa-times-circle"></i> Close Interaction
            </button>
            <br />
          </Fragment>
        ) : (
          ""
        )}
      </div>
      // </Wrapper>
    );
  }
}
