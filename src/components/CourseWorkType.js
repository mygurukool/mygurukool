import React from "react";
import { Form, Button, DropdownButton, Dropdown, Modal } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";
import {driveFileTypes} from "./util/gConsts"
import {COURSE_ID} from "./util/constants"
import DriveFileTypeDropdown from "./util/DropdownUtil";

const driveFileTypeList = Object.keys(driveFileTypes).map(key => driveFileTypes[key]);
const TITLE_FIELD = "titleField";
const DRIVE_FILE_NAME_FIELD = "driveFileNameField";

export default class CourseWorkType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionsField: "",
      titleField: "",
      driveFileNameField: "",
      driveFileType: "",
      isAssignDisabled: true,
      driveFiles: [],
      showDriveFileModal: false,
    };
    this.child = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  createDriveFiles = async () => {
    this.setState({showDriveFileModal: false})
    let fileUrl = await _classworkUtil.getDriveFileLink(this.state.driveFileNameField, this.state.driveFileType).then(response  => response);
    let fileData = {name: this.state.driveFileNameField, url: fileUrl, type: this.state.driveFileType};
    let driveFiles = this.state.driveFiles;
    driveFiles.push(fileData);
    await this.setState({driveFiles: driveFiles});
  }

  driveFileSelected = async (fileType) =>{
    await this.setState({showDriveFileModal: true, driveFileType: fileType});
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;
    if((name === TITLE_FIELD) && value.length > 0)
      this.setState({isAssignDisabled: false,});
    
    await this.setState({
      [name]: value, 
    });
  };

  keyDown = async (event) => {
    if(event.keyCode === 13 && (event.target.name === DRIVE_FILE_NAME_FIELD)) {
      this.createDriveFiles();
    }
  }

  handleClick = async (eventId) => {
    if(eventId !== 'cancel'){
      let courseWork = {title: this.state.titleField.trim(), 
                        description: this.state.instructionsField, 
                        workType: this.props.workTypeData.type,
                        courseId: sessionStorage.getItem(COURSE_ID),
                        driveFiles: this.state.driveFiles,
                      };
      _classworkUtil.createCourseWork(courseWork).then((res) => console.log(res));
    }
    this.props.showCreateCourseWork(false);
  };

  render() {
    const { instructionsField, titleField, driveFileNameField } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-11">
            <Button id="cancel" variant="secondary" type="cancel" onClick={(e) => this.handleClick(e.target.id)}>
              X
            </Button>
          </div>
          <div className="col-1">
            <Button id="submit" 
              variant="primary"
              type="submit"
              disabled={this.state.isAssignDisabled}
              onClick={(e) => this.handleClick(e.target.id)}
            >
              Assign
            </Button>
          </div>
        </div>
        <Form>
          <div className="row">
            <Form.Label>
              <b>{this.props.workTypeData.title}</b>
            </Form.Label>
          </div>
          <Form.Group controlId="formCreateCourseWork">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="input"
              name={TITLE_FIELD}
              //placeholder="eg: English, French"
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              onChange={(e) => this.handleChange(e)}
            />
            {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}

            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              name="instructionsField"
              //placeholder="Class 3A"
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <DriveFileTypeDropdown 
            dropdownTitleText="+ Create" 
            itemList={driveFileTypeList}
            itemSelection={this.driveFileSelected}
          />
        </Form>

        <Modal
          show={this.state.showDriveFileModal}
          backdrop="static"
          keyboard={true}
          centered={true}
        >
          <Modal.Body>
            <Form>
              <Form.Group controlId="formDriveFile">
              <Form.Label>{this.state.driveFileType} Title</Form.Label>
                <Form.Control
                  type="input"
                  name={DRIVE_FILE_NAME_FIELD}
                  autofocus="true"
                  //placeholder="eg: English, French"
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  onKeyDown={(e) => this.keyDown(e)}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Button variant="primary" onClick={this.createDriveFiles}>
            Go!
          </Button>
        </Modal>
        <table className="col-12 table table-stripped">
          {this.state.driveFiles.length > 0
            ? this.state.driveFiles.map((file) => (
                <tr>
                  <td className="filelink">
                    {file.name}
                  </td>
                  <td colspan="2" className="filelink icons">
                    {/* {this.state.driveFiles > 0 ? ( */}
                    <a href={file.url} target="_blank">
                      <i className="fas fa-eye fa-2x"></i>
                    </a>
                  </td>
                </tr>
              ))
            : ""}
        </table>
      </div>
    );
  }
}
