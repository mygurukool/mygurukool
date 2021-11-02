import React, { Component, Fragment } from "react";
import { MessageBox, MessageList, Input, Button } from "react-chat-elements";
import * as _apiUtils from "../util/AxiosUtil";
import "react-chat-elements/dist/main.css";
import * as _constant from "../util/constants";

let initiatorMsg = {
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

//this field is an individual message from 2nd person, be a teacher or another student
let responseMsg = {
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
export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentBlock: false,
      commentList: [initiatorMsg, responseMsg], //TODO: Dev hack, this commentList should be coming from/ sync with the server
    };
    // this.cancelClick = this.cancelClick.bind(this);
    this.showInputElement = this.showInputElement.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
  }

  cancelClick = (event) => {
    this.setState({
      showCommentBlock: false,
      showReplyBlock: false,
    });
    console.log(this.state.commentList);
  };

  startTimeOut() {
    // this.props.resetTimeout(true);
    setTimeout(() => {
      this.setState({ showCommentBlock: false });
    }, _constant.MESSAGE_WINDOW_TIMEOUT);
    return false;
  }

  componentDidMount() {
    // this.startTimeOut();
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  buildComment(comment, msgType) {
    //alert("buildComment  " + this.state.replyEventObj);
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
      text: comment,
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

  // temparory function, need to evaluate should function be required, based on how the server is sending the text 
  buildTeacherComment(comment, msgType) {
    //alert("buildComment  " + this.state.replyEventObj);
    let msg = {
      reply: msgType === REPLY ? this.state.replyEventObj : null,
      position: "left", //"right" : "left",
      // forwarded: true,
      replyButton: true,
      type: "text",
      theme: "white",
      view: "list",
      title: "Author name: Teacher",
      //titleColor: this.getRandomColor(),
      text: "teachers reply for your comment: " + comment,
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

  syncComments() {
    _apiUtils
      .googleDriveGetFiles({
        fields: "*",
        q: `name = 'Mathematics Class/ Class teacher name'`,
      })
      .then((response) => {
        console.log(response);
      });
    //googleDriveUploadFile(name, content, mime, folderId)
    alert("Submit Clicked: " + this.state.courseId);
    // let folderId =
    //   "0BzJfQgFkF_jafjRtSDUxazlqaVFtVVZLQ2ZPX1dMaFNzektPZ293WW5IOWlHU0VfODdWcjg";
    // _apiUtils
    //   .googleDriveUploadFile(
    //     this.file.name,
    //     this.file,
    //     "application/octet-stream",
    //     folderId
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });
  }

  addComment(comment, msgType) {
    var list = this.state.commentList;
    list.push(this.buildComment(comment, msgType));
    list.push(this.buildTeacherComment(comment, msgType));
    this.setState({
      commentList: list,
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
       "Send" (Direct comment) / "Reply" (Comment existing msg)
  */
  showInputElement(type) {
    this.startTimeOut();
    let comment;
    let defaultPlaceHolder = type === REPLY ? "Reply..." : "Type here...";
    let inputCssName = type === ASK ? "card col-12" : "card row-12";
    let replyCssName = type === REPLY ? "card row-12" : "";
    return (
      <Fragment>
        <br />
        <div className={replyCssName}>
          {type === REPLY
            ? (alert("buildingReply: " + this.state.replyEventObj.comment),
              (
                <MessageBox
                  reply={this.state.replyEventObj}
                  position={"right"}
                />
              ))
            : ""}

          {/* <div className="row"> */}
          <div className={inputCssName}>
            <Input
              placeholder={defaultPlaceHolder}
              defaultValue=""
              ref={this.input}
              multiline={true}
              autofocus={true}
              // buttonsFloat="left"
              onKeyPress={(e) => {
                this.startTimeOut();
                comment = e.target.value;
                if (e.shiftKey && e.charCode === 13) {
                  this.input.current.clear();
                  return true;
                }
                if (e.charCode === 13) {
                  this.input.current.clear();
                  this.addComment(comment, type);
                  e.preventDefault();
                  return false;
                }
              }}
              rightButtons={
                type === ASK ? (
                  <Button
                    text={type}
                    onClick={(e) => this.addComment(comment, type)}
                  />
                ) : (
                  <div className="col-2">
                    <Button
                      text={type}
                      onClick={(e) => this.addComment(comment, type)}
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
  replyComment = (e) => {
    console.log("onReplyClick " + JSON.stringify(e));
    this.setState({
      showReplyBlock: true,
      replyEventObj: {
        // photoURL: "https://facebook.github.io/react/img/logo.svg",
        title: e.title,
        titleColor: "#8717ae",
        comment: e.text,
      },
    });
    alert("replyComment " + e.text);
  };
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary turnin"
          onClick={() => this.setState({ showCommentBlock: true })}
        >
          <i className="fas fa-question-circle"></i> Feel free to ask!!
        </button>
        {this.state.showCommentBlock === true ? (
          <div className="card card-body fileblock col-12">
            <div className="container">
              <div className="right-panel">
                <MessageList
                  className="message-list"
                  lockable={true}
                  downButtonBadge={10}
                  dataSource={this.state.commentList}
                  onReplyClick={(e) => this.replyComment(e)}
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
        <br />
      </div>
    );
  }
}
