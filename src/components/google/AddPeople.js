import React from "react";
import {invitePeople} from "./ClassworkUtil";
import { Modal, Button, Form } from "react-bootstrap";
import {COURSE_ID} from "../util/constants";
import {roleType} from "../util/gConsts";
import {getKeyFromEnumValue} from "../util/utils";
export default class AddPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showTeacherModal: true };
    this.input = React.createRef();
  }

  hideAddPeopleModal() {
    this.props.showAddPeopleModal(false);
  }
  handleInvites  = () => {
    let key = getKeyFromEnumValue(roleType, this.props.invitePeopleType)
    invitePeople(sessionStorage.getItem(COURSE_ID), this.input.current.value, key);
    this.hideAddPeopleModal()
  };

  handleCancel = () => {
    this.hideAddPeopleModal()
  };

  render() {
    return (
      <div className="card card-body">
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
          <Form.Control
            as="textarea"
            //name="input"
            ref={this.input}
            placeholder="Enter email addresses, eg: teacher@mygurukool.com, english_teacher@mygurukool.com"
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleInvites}>
            Invite
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {this.state.isTeacherLogin && !this.state.hasTeacherAccepted ? (
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
            )} */}
      </div>
    );
  }
}
