import React, { Component, Fragment } from "react";
import { MessageBox, MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import * as _constant from "../util/constants";
import * as _apiUtils from "../util/AxiosUtil";

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
export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageBlock: false,
      show: true,
      messageList: [studentMsg, teacherMsg], //TODO: Dev hack, msglist tobe del for prod
      gDriveCommentsFileId: null,
    };
    this.showInputElement = this.showInputElement.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.syncComments = this.syncComments.bind(this);
    this.mergeComments = this.mergeComments.bind(this);
  }

  closeClick = (event) => {
    this.setState({
      showMessageBlock: false,
      showReplyBlock: false,
    });
    console.log(this.state.messageList);
    this.syncComments();
  };

  openComments = (e) => {
    this.setState({ showMessageBlock: true });
    this.syncComments();
  };

  startTimeOut() {
    // this.props.resetTimeout(true);
    setTimeout(() => {
      this.setState({ showMessageBlock: false });
    }, _constant.MESSAGE_WINDOW_TIMEOUT);
    return false;
  }

  componentWillMount() {
    // setInterval(this.addMessage.bind(this), 3000);
  }

  mergeComments(localList, serverList) {
    var tempList = [...localList, ...serverList];
    var mergedList = tempList.sort(function (a, b) {
      return a.date - b.date;
    });
    console.log("mergedList " + mergedList);
    return mergedList;
  }

  syncComments(type) {
    let fileName =
      this.props.subjectName + "temp13" + "_CommentTranscript.json";

    //update the file else get file by Name
    if (this.state.gDriveCommentsFileId) {
      /*
        This section will be executed(actions: fetch, merge and update)
          - For both read and write as soon as 
              1: Comments file is created 
              2: After first fetch for the current session
      */

      //fetch downloadable file
      let downloadedComments = [];
      _apiUtils
        .googleDriveDownloadFile(this.state.gDriveCommentsFileId)
        .then((resJsonFile) => {
          console.log(
            "get byCommentsFileId JSON Data, update messageList with: " +
              JSON.stringify(resJsonFile.data)
          );
          downloadedComments.push(resJsonFile.data);
        });

      //merge
      this.state.messageList = this.mergeComments(
        this.state.messageList,
        downloadedComments
      );

      console.log("merged messageList " + this.state.messageList);
      //update
      _apiUtils
        .googleDriveUpdateFile(
          fileName,
          JSON.stringify(this.state.messageList),
          "application/json",
          this.state.gDriveCommentsFileId
        )
        .then((response) => {
          console.log("CommentsFileId update: " + JSON.stringify(response));
        });
    } else {
      /*
      This clause will be executed(actions: fetch by file name, merge and update)
        1: Comments file doesnt exist 
        2: First fetch for the current session
      */

      //Step2: get file by Name  ..if it doesnt exist Create else update
      _apiUtils
        .googleDriveGetFiles({
          fields: "*",
          q: `name = '${fileName}' and trashed = false`,
        })
        .then((respByName) => {
          console.log("GetByFileName: " + JSON.stringify(respByName.data));

          if (respByName.data.files.length === 0) {
            console.log("Trying to create File: ");

            //Step1: get StudentCourseDetails, tobe able to get studentWorkFolder.id
            _apiUtils
              .googleClassroomStudentCourseDetails(this.props.courseId)
              .then((respCourseDetails) => {
                console.log(
                  "StudentCourseDetails: " + JSON.stringify(respCourseDetails)
                );

                //Step2 create
                _apiUtils
                  .googleDriveUploadFile(
                    fileName,
                    JSON.stringify(this.state.messageList),
                    "application/json",
                    respCourseDetails.data.studentWorkFolder.id
                  )
                  .then((resCreate) => {
                    console.log("upload: " + JSON.stringify(resCreate));
                    this.setState({
                      //set gdrive file id
                      gDriveCommentsFileId: resCreate.data.id,
                    });
                  })
                  .catch((error) => {
                    console.log("Create File " + error);
                  });
              });
          } else {
            //***update section***
            let fileId;
            let downloadedComments = [];
            if (respByName.data.hasOwnProperty("id"))
              fileId = respByName.data.id;
            else fileId = respByName.data.files[0].id;

            this.setState({
              //set gdrive file id
              gDriveCommentsFileId: fileId,
            });
            //fetch downloadable file
            _apiUtils.googleDriveDownloadFile(fileId).then((resJsonFile) => {
              console.log(
                "JSON Data, update local messageList with: " +
                  JSON.stringify(resJsonFile)
              );
              downloadedComments.push(resJsonFile.data);
            });

            //merge locallist with serverlist
            this.state.messageList = this.mergeComments(
              this.state.messageList,
              downloadedComments
            );
            console.log("else merged messageList " + this.state.messageList);
            //update server with mergedList
            _apiUtils
              .googleDriveUpdateFile(
                fileName,
                JSON.stringify(this.state.messageList),
                "application/json",
                respByName.data.files[0].id
              )
              .then((response) => {
                console.log(
                  "getByfilename upload : " + JSON.stringify(response)
                );
              });
          }
        })
        .catch((error) => {
          console.log("GetByFileName " + error);
        });
    }
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
    this.startTimeOut();
    let message;
    let defaultPlaceHolder = type === REPLY ? "Reply..." : "Type here...";
    let inputCssName = type === ASK ? "card col-12" : "card row-12";
    let replyCssName = type === REPLY ? "card row-12" : "";
    return (
      <Fragment>
        <br />
        <div className={replyCssName}>
          {type === REPLY ? (
            <MessageBox reply={this.state.replyEventObj} position={"right"} />
          ) : (
            ""
          )}

          {/* <div className="row"> */}
          <div className={inputCssName}>
            <Input
              placeholder={defaultPlaceHolder}
              defaultValue=""
              ref="input"
              multiline={true}
              autofocus={true}
              // buttonsFloat="left"
              onKeyPress={(e) => {
                this.startTimeOut();
                message = e.target.value;
                if (e.shiftKey && e.charCode === 13) {
                  this.refs.input.clear();
                  return true;
                }
                if (e.charCode === 13) {
                  this.refs.input && this.refs.input.clear();
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
          onClick={this.openComments}
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
                onClick={this.closeClick}
                className="btn btn-danger float-right"
              >
                <i className="fas fa-comment-slash"></i> Close Interaction
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
