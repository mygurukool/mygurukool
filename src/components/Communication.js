import React, { Component } from "react";
export default class Communication extends Component {
  constructor(props) {
    super(props);
    this.state = { resize: false };
  }

  handleClick = (e) => {
    this.state.resize = !this.state.resize;
    //Communication Pane=> size/e.target.id: -1:close window; 0:minimize(50%); 1:maximize
    this.props.paneMaximize(parseInt(e.target.id));
  };
  render() {
    return (
      // <div className="container">
      <div className="nav-item">
        &emsp;
        <a href="#">
          <i class="fas fa-window-close" id={-1} onClick={this.handleClick}></i>
        </a>{" "}
        &emsp;
        <a href="#">
          {this.state.resize ? (
            <i
              class="far fa-window-minimize fa-1g"
              id={0}
              onClick={this.handleClick}
            ></i>
          ) : (
            <i
              class="far fa-window-maximize fa-1g"
              id={1}
              onClick={this.handleClick}
            ></i>
          )}{" "}
        </a>
        &emsp;Video Conference
        {/* {localStorage.getItem("currentView")
          ? +localStorage.getItem("currentView") + "Conference room"
          : "Video Conference"} */}
        <iframe
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          // src="https://discord.com/widget?id=722748297999155321&theme=dark"
          //src="https://titanembeds.com/embed/722758223106408468"
          //src="https://titanembeds.com/embed/722755053848625172"
          //src="https://demo.bigbluebutton.org/gl/myg-jpr-jfi#"
          src="https://meet.jit.si/GuruKoolSchoolVideoConference"
          width="100%"
          height="700"
          allowtransparency="true"
          frameborder="0"
        ></iframe>
      </div>
    );
  }
}
