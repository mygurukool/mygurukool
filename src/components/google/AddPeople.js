import React from "react";
import {invitePeople} from "./ClassworkUtil";
import { Modal, Button, Form } from "react-bootstrap";
import {COURSE_ID} from "../util/constants";
import {roleType} from "../util/gConsts";
import {getKeyFromEnumValue} from "../util/utils";
import { ReactComponent as RightArrowIcon } from '../../assets/icons/arrow.svg'
import { ReactComponent as CrossIcon } from '../../assets/icons/cross-white.svg'
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
        <Modal.Header className="card-header bg-green">
          <Modal.Title className="card-title m-0 txt-white">Invite {this.props.invitePeopleType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
          className="form-control input-field mb-3"
            as="textarea"
            //name="input"
            ref={this.input}
            placeholder="Enter email addresses, eg: teacher@mygurukool.com, english_teacher@mygurukool.com"
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
        <div className="create-btn d-flex justify-content-center">
          <Button variant="secondary" onClick={this.handleCancel} className="btn-red  bg-grey bg-green txt-white m-0 mr-1" >
            Cancel
            <CrossIcon />
          </Button>
          <Button variant="primary" onClick={this.handleInvites}  className="btn-red bg-green txt-white m-0 ml-1">
            Invite
            <RightArrowIcon />
          </Button>
        </div>
        </Modal.Body>
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
