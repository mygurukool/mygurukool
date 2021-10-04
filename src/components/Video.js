import React, { Component, Fragment } from "react";
import ModalVideo from "react-modal-video";
import "../scss/modal-video.scss";
import * as _constants from "./util/constants";
import { ReactComponent as VideoIcon } from '../assets/icons/video.svg'

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // vidLink: props.youtubelink,
      id: "",
      title: "",
      thumbnailUrl: "",
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
    if (sessionStorage.getItem("loginProvider") === _constants.GOOGLE) {
      //TODO: this.setState({id: this.props.id, ....})  was throwing
      //Unhandled Rejection (Error): Maximum update depth exceeded
      this.state.id = this.props.id;
      this.state.title = this.props.title;
      this.state.thumbnailUrl = this.props.thumbnailUrl;
    } else {
      // exctract video Id from youtubelink
      if (this.props.vidData.youtubelink) {
        this.props.vidData.youtubelink = this.props.vidData.youtubelink
          .split(/[\/]+/)
          .pop();
        //should the url has "=" before the vid id
        this.state.id = this.props.vidData.youtubelink.split(/[\=]+/).pop();
      }
      this.state.title = this.props.vidData.youtubename;
    }
  }

  render() {
    return (
      <div>
        {this.extractVideoIds()}
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={this.state.id}
          onClose={() => this.setState({ isOpen: false })}
        />
        {this.state.title ? this.state.title : ""}
        <br />
        {this.state.thumbnailUrl ? (
          <button type="button" className="btn-red bg-yellow txt-black btn btn-info btn-sm" onClick={this.openModal}>
            <VideoIcon />
            Im Video, Click me!
          </button>
        ) : (
          <button
            type="button"
            className="btn-red bg-yellow txt-black btn btn-info btn-sm"
            onClick={this.openModal}
          >
              <VideoIcon />
            Im Video, Click me!
          </button>
        )}
      </div>
    );
  }
}
