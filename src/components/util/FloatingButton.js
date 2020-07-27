import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import React, { Component } from "react";
import * as _classworkUtil from "../google/ClassworkUtil";

// let actionList = [`<Action text="Conference" onClick={this.onConferenceClick}>
// <i className="far fa-comments fa-1g" />
// </Action>`, `<Action text="Archive" onClick={() => alert("archive")}>
// <i className="far fa-file-archive fa-1g" />
// </Action>`];




export default class FloatingButton extends Component {
  onConferenceClick = () => {
    this.props.performAction(true);
  };

  onClickCreateCourse  = () => {
    this.props.showCreateCourse(true);
  }

  onClickCreateCourseWork  = () => {
    this.props.showCreateCourseWork(true);
    //window.location.href = '/home/createcourseWork';
  }



//   var mydict = new Array();
// mydict['onClickMethod']   = 'this.onConferenceClick';
/* Somewhere: */
// window.settings = {
//   /* [..] Other settings */
//   functionName: 'this.onConferenceClick'
//   /* , [..] More settings */
// };
// let fn = window[settings.functionName];
// let actionList = [{text: 'Conference', fn, imgIcon: 'far fa-comments fa-1g'}, 
// //{text: 'Archive', onClickMethod: '() => alert("archive")', imgIcon: 'far fa-file-archive fa-1g'}
// ];

  render() {
    return (
      <>
        <Fab
          mainButtonStyles={{
            backgroundColor: "#00b5ad",
          }}
          actionButtonStyles={{
            backgroundColor: "#ffffff",
            color: "#34495e",
          }}
          position={{
            bottom: 100,
            left: 50,
          }}
          icon="i"
          event="hover"
        >
         {/* {actionList.map((action) => (
           <Action text={action.text} onClick={action.fn}>
            <i className={action.imgIcon} />
           </Action>
         )
         )}  */}
         {/* {actionList.map((action) => <li>{action}</li>) } */}
         <Action text="Conference" onClick={this.onConferenceClick}>
           <i className="far fa-comments fa-1g" />
         </Action>
         <Action text="Archive" onClick={() => alert("archive")}>
           <i className="fas fa-file-archive fa-1g" />
         </Action>
         <Action text="Create Course" onClick={this.onClickCreateCourse}>
           <i className="fas fa-plus-circle fa-1g" />
         </Action>
         <Action text="Create Course Work" onClick={this.onClickCreateCourseWork}>
           <i className="fas fa-plus-circle fa-1g" />
         </Action>
        </Fab>
      </>
    );
  }
}
