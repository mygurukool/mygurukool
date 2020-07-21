import { Fab, Action } from "react-tiny-fab";
import "../../scss/tinyFabstyles.css";
import React, { Component } from "react";

export default class FloatingButton extends Component {
  onConferenceClick = () => {
    this.props.performAction(true);
  };

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
          icon="+"
          event="hover"
        >
          <Action text="Conference" onClick={this.onConferenceClick}>
            <i className="far fa-comments fa-1g" />
          </Action>
          <Action text="Archive" onClick={() => alert("archive")}>
            <i className="far fa-file-archive fa-1g" />
          </Action>
        </Fab>
      </>
    );
  }
}
