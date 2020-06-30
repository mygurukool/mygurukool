import React, { Component, Fragment } from "react";
import { MessageBox, MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

let msgList = {
  position: "left",
  replyButton: true,
  type: "text",
  theme: "white",
  view: "list",
  title: "Author name: SomeUser",
  text: "How do I solve this issue",
  status: "read",
  date: +new Date(),
  onReplyMessageClick: () => {
    console.log("onReplyMessageClick");
    alert("onReplyMessageClick");
  },
};
const REPLY = "Reply";
const SEND = "Send";
export default class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageBlock: false,
      show: true,
      messageList: [msgList], //TODO: Dev hack, msglist tobe del for prod
    };
    this.cancelClick = this.cancelClick.bind(this);
    this.showInputElement = this.showInputElement.bind(this);
  }
  cancelClick = (event) => {
    this.setState({
      showMessageBlock: false,
      showReplyBlock: false,
    });
    console.log(this.state.messageList);
  };

  componentWillMount() {
    // setInterval(this.addMessage.bind(this), 3000);
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  buildMessage(message, msgType) {
    let msg = {
      reply: msgType === REPLY ? this.state.replyEventObj : null,
      position: "right", //"right" : "left",
      // forwarded: true,
      replyButton: true,
      type: "text",
      theme: "white",
      view: "list",
      title: "Author name: " + this.props.userName,
      //titleColor: this.getRandomColor(),
      text: message,
      status: "read",
      date: +new Date(),
      onReplyMessageClick: () => {
        console.log("onReplyMessageClick");
        alert("onReplyMessageClick");
      },
      // avatar: `data:image/png;base64,${this.photo()}`,
    };
    return msg;
  }

  addMessage(message, msgType) {
    var list = this.state.messageList;
    list.push(this.buildMessage(message, msgType));
    this.setState({
      messageList: list,
    });
    if (msgType === REPLY) {
      this.setState({
        showReplyBlock: false,
      });
    }
  }

  /* 
  Method to display Input field
  Type: Text on Button, type of input field:
       "Send" (Direct message) / "Reply" (Comment existing msg)
  */
  showInputElement(type) {
    let message;
    let defaultPlaceHolder = type === REPLY ? "Reply..." : "Type here...";
    return (
      <Fragment>
        {type === REPLY ? (
          //  <div class="card card-body">
          <MessageBox reply={this.state.replyEventObj} position={"left"} />
        ) : (
          ""
        )}
        <Input
          placeholder={defaultPlaceHolder}
          defaultValue=""
          ref="input"
          multiline={true}
          autofocus={true}
          // buttonsFloat='left'
          onKeyPress={(e) => {
            message = e.target.value;
            if (e.shiftKey && e.charCode === 13) {
              return true;
            }
            if (e.charCode === 13) {
              this.refs.input.clear();
              this.addMessage(message, type);
              e.preventDefault();
              return false;
            }
          }}
          rightButtons={
            type === SEND ? (
              <Button
                text={type}
                onClick={(e) => this.addMessage(message, type)}
              />
            ) : (
              ""
            )
          }
        />
        {/* TODO: Damn hack.. INPUT -> rightButtons={ option should be explored
         */}
        {type === REPLY ? (
          <div class="row float-right">
            <Button
              text={type}
              onClick={(e) => this.addMessage(message, type)}
            />{" "}
            <Button
              text="Cancel"
              onClick={(e) =>
                this.setState({
                  showReplyBlock: false,
                })
              }
            />
          </div>
        ) : (
          // </div>
          ""
        )}
      </Fragment>
    );
  }
  replyMessage = (e) => {
    console.log("onReplyClick " + JSON.stringify(e));
    this.setState({
      showReplyBlock: true,
      replyEventObj: {
        // photoURL: "https://facebook.github.io/react/img/logo.svg",
        title: e.title,
        titleColor: "#8717ae",
        message: e.text,
      },
    });
  };
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary turnin"
          onClick={() => this.setState({ showMessageBlock: true })}
        >
          <i class="fas fa-question-circle"></i> Feel free to ask!!
        </button>
        {this.state.showMessageBlock === true ? (
          <div class="card card-body fileblock col-12">
            <div className="container">
              <div className="chat-list">
                {/* <MessageBox
                  reply={{
                    photoURL: "https://facebook.github.io/react/img/logo.svg",
                    title: "elit magna",
                    titleColor: "#8717ae",
                    message: "Aliqua amet incididunt id nostrud",
                  }}
                  onReplyMessageClick={() => console.log("reply clicked!")}
                  position={"left"}
                  type={"text"}
                  text={
                    "Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure."
                  }
                /> */}
              </div>
              <div className="right-panel">
                <MessageList
                  className="message-list"
                  lockable={true}
                  downButtonBadge={10}
                  dataSource={this.state.messageList}
                  onReplyClick={(e) => this.replyMessage(e)}
                  replyButton={true}
                />
                {/* Show the Reply Block, only when Reply is Clicked */}
                {this.state.showReplyBlock ? this.showInputElement(REPLY) : ""}
                {/* Comment Input area */}
                {this.showInputElement(SEND)}
              </div>
            </div>
            <div className="form-group">
              <br />
              <button
                type="reset"
                onClick={this.cancelClick}
                className="btn btn-danger float-right"
              >
                <i class="far fa-times-circle"></i> Close
              </button>
              {/* <button
                type="button"
                className="btn btn-success upload-btn"
                onClick={this.cancelClick}
              >
                <i class="fas fa-cloud-upload-alt"></i> Submit
              </button> */}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
