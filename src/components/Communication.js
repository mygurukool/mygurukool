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
        <iframe
          width="100%"
          height="700"
          frameborder="0"
          scrolling="no"
          src={process.env.REACT_APP_COMMUNICATION_SERVER}
        ></iframe>
      </div>
      // </div>
    );
  }
}
