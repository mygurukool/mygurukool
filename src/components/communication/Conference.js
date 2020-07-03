import React, { Component } from "react";
export default class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = { resize: false };
  }

  handleClick = (e) => {
    this.state.resize = !this.state.resize;
    //Conference Pane=> size/e.target.id: -1:close window; 0:minimize(50%); 1:maximize
    this.props.paneMaximize(parseInt(e.target.id));
  };

  render() {
    return (
      <div className="row-12">
        <div className="alert alert-primary" role="alert">
          <a href="#">
            <i
              className="fas fa-window-close"
              id={-1}
              onClick={this.handleClick}
            ></i>
          </a>{" "}
          &emsp;
          <a href="#">
            {this.state.resize ? (
              <i
                className="far fa-window-minimize fa-1g"
                id={0}
                onClick={this.handleClick}
              ></i>
            ) : (
              <i
                className="far fa-window-maximize fa-1g"
                id={1}
                onClick={this.handleClick}
              ></i>
            )}{" "}
          </a>
          &emsp;
          <span>Video Conference</span>
          {/* {localStorage.getItem("currentView")
           ? +localStorage.getItem("currentView") + "Conference room"
           : "Video Conference"} */}
          <iframe
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            src="https://meet.jit.si/GuruKoolSchoolVideoConference"
            width="100%"
            height="700"
            allowtransparency="true"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    );
  }
}
