import React, { Component } from "react";
export default class Audio extends Component {
  render() {
    return (
      <div>
        <iframe
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          src="https://meet.jit.si/GuruKoolSchoolVideoConference"
          width="100%"
          height="300"
          allowtransparency="true"
          frameborder="0"
        ></iframe>
      </div>
    );
  }
}
