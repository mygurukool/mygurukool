import React from "react";
import ModalVideo from "react-modal-video";
import "../scss/modal-video.scss";

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // vidLink: props.youtubelink,
      vidId: "",
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.extractVideoIds = this.extractVideoIds.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }

  extractVideoIds() {
    //TODO: function should also extract video channel eg: youtube, youku, etc

    // exctract vid Id
    if (this.props.vidData.youtubelink) {
      this.props.vidData.youtubelink = this.props.vidData.youtubelink
        .split(/[\/]+/)
        .pop();
      //should the url has "=" before the vid id
      this.props.vidData.youtubelink = this.props.vidData.youtubelink
        .split(/[\=]+/)
        .pop();
    }
  }

  render() {
    return (
      <div>
        {this.extractVideoIds()}
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={this.props.vidData.youtubelink}
          onClose={() => this.setState({ isOpen: false })}
        />
        {this.props.vidData.youtubename ? this.props.vidData.youtubename : ""}
        <br />
        <button
          type="button"
          className="btn btn-video margin-5px"
          onClick={this.openModal}
        >
          <i class="fas fa-video"></i>
          <b> Im Video, Click me!!</b>
        </button>
      </div>
    );
  }
}
