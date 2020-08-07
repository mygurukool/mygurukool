import React from 'react';
import {Modal, Button, Form} from "react-bootstrap";


export default class AddPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showTeacherModal: true };
    }

    handleInvites = () => {

    }
    
    handleCancel = () => {
      this.props.showAddPeopleModal(false);
    }

    render(){
        return (
        <Modal
            show={this.state.showTeacherModal}
            backdrop="static"
            keyboard={false}
            centered={true}
          >
            <Modal.Header>
        <Modal.Title>Invite {this.props.invitePeopleType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Form.Control
              type="input"
              name="input"
              //placeholder="eg: English, French"
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            />
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={this.handleInvites}
              >
                Invite
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