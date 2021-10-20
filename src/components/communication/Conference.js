/*global JitsiMeetExternalAPI*/
import React, { Component } from 'react';
import * as _util from "../util/utils";
import { ReactComponent as WindowIcon } from '../../assets/icons/window.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

const containerStyle = {
    width: '100%',
    height: '100%',
};

export default class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = { resize: false, loading: true, };

    let jitsiContainerStyle = {
      display: (this.state.loading ? 'none' : 'block'),
      width: '100%',
      height: '100%',
    }
  }

  handleClick = (e) => {
    this.state.resize = !this.state.resize;
    //Conference Pane=> size/e.target.id: -1:close window; 0:minimize(50%); 1:maximize
    this.props.paneMaximize(parseInt(e.target.id));
  };

  componentDidMount(){
   if (window.JitsiMeetExternalAPI) this.startConference();
   else alert('Jitsi Meet API script not loaded');
  }

  startConference() {
    try {
     const domain = 'meet.jit.si';
     const options = {
      roomName: 'GuruKoolSchoolVideoConference',
      height: 700,
      parentNode: document.getElementById('conference'),
      interfaceConfigOverwrite: {
       filmStripOnly: false,
       SHOW_JITSI_WATERMARK: false,
      },
      configOverwrite: {
       disableSimulcast: false,
      },
     };
  
     const api = new JitsiMeetExternalAPI(domain, options);
     api.addEventListener('videoConferenceJoined', () => {
      console.log('Local User Joined');
      this.setState({loading: false })
      api.executeCommand('displayName', this.props.userData.name+ "( " + this.props.userData.group+" )");
      //api.executeCommand('toggleVideo');
     });
    } catch (error) {
     console.error('Failed to load Jitsi API', error);
    }
   }

  render() {
    return (
      <div className="row-12">
        <div role="alert" className="bg-white">
         <div className="confrance-header">
         <span>Video Conference</span>
          <div>
          
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
          <a href="#">
            <i
              className="fas fa-window-close"
              id={-1}
              onClick={this.handleClick}
            >
            </i>
          </a>{" "}
          </div>
          
         </div>
          <div id='conference' style={containerStyle}>
            {this.state.loading ? (
              <div className="center-loader"><img src={_util.loaderRandomGifs()} className="loaderIcon" /></div>
            ) : (
              ""
            )}
            <div style={this.jitsiContainerStyle} />
          </div>
        </div>
      </div>
    );
  }
}
