/* global gapi */
import React from 'react';
import {Modal, Button} from "react-bootstrap";
import {REACT_APP_GOOGLE_OAUTH_TUTOR_SCOPES} from "../util/gConsts"
import { ACCESS_TOKEN, HAS_TEACHER_ACCEPTED } from "../util/constants";

export default class TeacherAuthorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showTeacherModal: true };
    }

    handleTeacherConfirmation = () => {
        sessionStorage.setItem(HAS_TEACHER_ACCEPTED, true);
        this.setState({
          showTeacherModal: false, hasTeacherAccepted: true});
        const options = new gapi.auth2.SigninOptionsBuilder();
        options.setScope(REACT_APP_GOOGLE_OAUTH_TUTOR_SCOPES);
    
        let googleUser = gapi.auth2.getAuthInstance().currentUser.get();
        googleUser.grant(options).then(
          function (success) {
            sessionStorage.setItem(ACCESS_TOKEN, success.Bc.access_token);
          },
          function (fail) {
            alert(JSON.stringify({ message: "fail", value: fail }));
          })
    }
      
    // handleTeacherDialogClose = () => {this.setState({showTeacherModal: false, hasTeacherAccepted: false})};

    render(){
        return (
        <Modal
            show={this.state.showTeacherModal}
            backdrop="static"
            keyboard={false}
            centered={true}
          >
            <Modal.Header>
              <Modal.Title>Additional Permissions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Welcome! You are identified as Teacher. Please approve, to
              present you additional Permissions and Authorize MyGuruKool App to facilitate you with access control to all your Google Classroom Courses!
            </Modal.Body>
            <Modal.Footer>
              {/* <Button
                variant="secondary"
                onClick={this.handleTeacherDialogClose}
              >
                I Reject!
              </Button> */}
              <Button
                variant="primary"
                onClick={this.handleTeacherConfirmation}
              >
                Yes, I Approve!
              </Button>
            </Modal.Footer>
          </Modal>

          
            /* {this.state.isTeacherLogin && !this.state.hasTeacherAccepted ? (
              <div className="col-12">
              <button
                type="button"
                className="btn btn-primary turnin"
                onClick={this.handleTeacherConfirmation}
              >
                <i className="fas fa-check"></i> Please present me additional Permissions.
              </button>
              </div>
            ) : (
              ""
            )} */
        );
    }
}