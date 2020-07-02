import React, { Component, Fragment } from "react";
import { MessageBox, MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

let studentMsg = {
  position: "right",
  replyButton: true,
  type: "text",
  theme: "white",
  view: "list",
  title: "From: MyGuruKool Student",
  text: "How do I solve this issue",
  status: "read",
  date: +new Date(),
  onReplyMessageClick: () => {
    console.log("onReplyMessageClick");
    alert("onReplyMessageClick");
  },
};

let teacherMsg = {
  position: "left",
  replyButton: true,
  type: "text",
  theme: "white",
  view: "list",
  title: "From: Teacher",
  text: "Read through Chapter 1",
  status: "sent",
  date: +new Date(),
  onReplyMessageClick: () => {
    console.log("onReplyMessageClick");
    alert("onReplyMessageClick");
  },
};

const REPLY = "Reply";
const ASK = "Ask";
export default class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageBlock: false,
      show: true,
      messageList: [studentMsg, teacherMsg], //TODO: Dev hack, msglist tobe del for prod
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
    let cssName = type === ASK ? "card col-12" : "card row-12";
    return (
      <Fragment>
        <br />
        <div className="card row-12">
          {type === REPLY ? (
            <MessageBox reply={this.state.replyEventObj} position={"right"} />
          ) : (
            ""
          )}

          {/* <div className="row"> */}
          <div className={cssName}>
            <Input
              placeholder={defaultPlaceHolder}
              defaultValue=""
              ref="input"
              multiline={true}
              autofocus={true}
              // buttonsFloat="left"
              onKeyPress={(e) => {
                message = e.target.value;
                if (e.shiftKey && e.charCode === 13) {
                  this.refs.input.clear();
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
                type === ASK ? (
                  <Button
                    text={type}
                    onClick={(e) => this.addMessage(message, type)}
                  />
                ) : (
                  <div className="col-2">
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
                    {/* <br /> */}
                  </div>
                )
              }
            />
          </div>
          {/* </div> */}
        </div>
        <br />
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
          <i className="fas fa-question-circle"></i> Feel free to ask!!
        </button>
        {this.state.showMessageBlock === true ? (
          <div className="card card-body fileblock col-12">
            <div className="container">
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
                {this.showInputElement(ASK)}
              </div>
            </div>
            <div className="form-group">
              <button
                type="reset"
                onClick={this.cancelClick}
                className="btn btn-danger float-right"
              >
                <i className="far fa-times-circle"></i> Close
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
