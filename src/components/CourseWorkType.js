import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";
import {driveFileTypes, courseWorkAction, addFileTypes, actionButtonText} from "./util/gConsts"
import {COURSE_ID} from "./util/constants"
import DriveFileTypeDropdown from "./util/DropdownUtil";
import {loaderRandomGifs} from "./util/utils";

const driveFileTypeList = Object.keys(driveFileTypes).map(key => driveFileTypes[key]);
const addFileTypeList = Object.keys(addFileTypes).map(key => addFileTypes[key]);
const TITLE_FIELD = "titleField";
const DRIVE_FILE_NAME_FIELD = "driveFileNameField";
const INSTRUCTIONS_FIELD= 'instructionsField';

let updateMask=[];
export default class CourseWorkType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionsField: "",
      titleField: "",
      driveFileNameField: "", //Drive files: that are attached by *Create* button action, gdrive native files
      driveFileType: "", //Drive files: that are attached by *Create* button action, gdrive native files
      addFileType: "", //Add files: that are attached by *ADD* button action
      isSubmitDisabled: true,
      driveFiles: [], //Drive files: that are attached by *Create* and *ADD* button action
      deleteDriveFiles: [], //Drive files: that are attached by *Create* and *ADD* button action
      showDriveFileModal: false,
      showAddFileModal: false,
      submitButtonText: "",
      assignmentToEdit: null,
      extractResultSet: [],
      isLoading: false,
    };
    this.child = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.renderStrippedTable = this.renderStrippedTable.bind(this);
    this.extractFilesToEdit = this.extractFilesToEdit.bind(this);
    this.handleFileDelete = this.handleFileDelete.bind(this);
  }

  componentDidMount(){
    this.setState({
      submitButtonText: (this.props.workTypeData.action === courseWorkAction.CREATE) ? 'Assign' : 'Save',
      assignmentToEdit: this.props.workTypeData.assignmentToEdit,
    });
    if(this.props.workTypeData.assignmentToEdit && this.props.workTypeData.assignmentToEdit.materials)
    this.extractFilesToEdit(this.props.workTypeData.assignmentToEdit.materials);
    
  }

  extractFilesToEdit(materials){
    let localFile=this.state.driveFiles;
    materials && materials.map((file) => {
      if(file.driveFile !== undefined){
        localFile && localFile.push(file.driveFile.driveFile);
      } else if(file.youtubeVideo !== undefined){
        localFile && localFile.push(file.youtubeVideo);
      } else if(file.form !== undefined){
        localFile && localFile.push(file.form);
      } else if(file.link !== undefined){
        localFile && localFile.push(file.link);
      } 
      this.setState({driveFiles: localFile});
    })
  }

  createDriveFiles = async () => {
    this.enableSubmitButton();
    this.setState({showDriveFileModal: false, isLoading: true});
    let file = await _classworkUtil.getDriveFileLink(this.state.driveFileNameField, this.state.driveFileType).then(response  => response);
    let fileData = {id: file.id, title: this.state.driveFileNameField, url: file.url, type: this.state.driveFileType};
    let driveFiles = this.state.driveFiles;
    //below code to build drive object instead of url
    // let file = await _classworkUtil.getDriveFileLink(this.state.driveFileNameField, this.state.driveFileType).then(response  => response);
    // let fileData = {title: this.state.driveFileNameField, url: fileUrl, type: this.state.driveFileType};
    // let driveFiles = this.state.driveFiles;
    driveFiles.push(fileData);  
    await this.setState({driveFiles: driveFiles, isLoading: false});
  }

  driveFileSelected = async (fileType) =>{
    await this.setState({showDriveFileModal: true, driveFileType: fileType});
  }

  addFileSelected = async (fileType) =>{
    await this.setState({showAddFileModal: true, addFileType: fileType});
  }

  enableSubmitButton = () => {
    this.setState({isSubmitDisabled: false,});
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;
    if((name === TITLE_FIELD) && value.length > 0){
      this.enableSubmitButton();
      this.updateMask('title');
    }

    if(this.props.workTypeData.action === courseWorkAction.EDIT){
      if((name === INSTRUCTIONS_FIELD) && value.length > 0){
        this.enableSubmitButton();
        this.updateMask('description');
      }
    }

    await this.setState({
      [name]: value, 
    });
  };

  updateMask = (item) => {
    if(updateMask.indexOf(item) === -1)
      updateMask.push(item);
  }

  keyDown = async (event) => {
    if(event.keyCode === 13 && (event.target.name === DRIVE_FILE_NAME_FIELD)) {
      this.createDriveFiles();
    }
  }

  handleClick = async (eventId) => {
    if(eventId !== 'cancel'){
      if(eventId === 'Assign')
        _classworkUtil.createCourseWork(this.prepareCoursework()).then((res) => console.log(res));
      else if(eventId === 'Save')
      alert(updateMask.toString())
        _classworkUtil.patchCourseWork(this.prepareCoursework(this.state.assignmentToEdit.id)).then((res) => console.log(res));
    } 
    this.handleCourseworkMutateGUI();
  };

  prepareCoursework = (courseworkId = "") => {
    // alert(sessionStorage.getItem(COURSE_ID))
    //   let courseWork = {id: courseworkId, title: this.state.titleField.trim(), 
    //                     description: this.state.instructionsField, 
    //                     workType: this.props.workTypeData.type,
    //                     courseId: sessionStorage.getItem(COURSE_ID),
    //                     driveFiles: [
    //                      // {"formUrl":"https://docs.google.com/forms/d/1kjabzYpC6rf74RF_FZPV544FUzVipYZOffoEoMygTnw/edit","title":"ffff","type":"Forms"},
    //                       {"url":"https://google.com","title":"https://google.com/","thumbnailUrl":"https://classroom.google.com/webthumbnail?url=https://google.com", "type":"Link"},
    //                       {"id":"1HiLP8ZtrnYEq9XgeeFj1VKpIpbpr8vr1","title":"commentTranscript1.json","alternateLink":"https://drive.google.com/open?id=1HiLP8ZtrnYEq9XgeeFj1VKpIpbpr8vr1",
    //                         "thumbnailUrl":"https://drive.google.com/thumbnail?id=1HiLP8ZtrnYEq9XgeeFj1VKpIpbpr8vr1&sz=s200",
    //                         "type":"Docs"},
    //                         {"id":"5aPahOD4ssk","title":"Learning Addition For Kids","alternateLink":"https://www.youtube.com/watch?v=5aPahOD4ssk",
    //                         "thumbnailUrl":"https://i.ytimg.com/vi/5aPahOD4ssk/default.jpg", 'type': 'YouTube',
    //                         },
    //                     ],
    //                     updateMask: updateMask,
    //                   };
    let courseWork = {id: courseworkId, title: this.state.titleField.trim(), 
                      description: this.state.instructionsField, 
                      workType: this.props.workTypeData.type,
                      courseId: sessionStorage.getItem(COURSE_ID),
                      driveFiles: this.state.driveFiles,
                    };
    return courseWork;
  }

  handleCourseworkMutateGUI = () => {
    if(this.props.workTypeData.action === courseWorkAction.CREATE) {
      this.props.showCreateCourseWork(false);
    } else {
      this.props.showEditCourseWork(false);
    }
  }

  handleFileDelete = async (index) => {
    this.setState({deleteDriveFiles: this.state.driveFiles[index]});
    var array = [...this.state.driveFiles];
    array.splice(index, 1);
    await this.setState({driveFiles: array});
    this.enableSubmitButton();
  }

  renderStrippedTable(files){
    let url='';
    let imgSrc=null;
    let id='';
    return files.length > 0
      ? files.map((file, index) => (
          //extract url

          //extract thumbnail
          // if(file.hasOwnProperty('thumbnailUrl')){
          //   imgSrc = require(file.thumbnailUrl);
          // }
          <tr>
            {/* <div>
                {imgSrc? <img src={imgSrc} className="loaderIcon" /> : ''}
              </div> */}
            <td className="filelink">{file.title}</td>
            <td colspan="2" className="filelink icons">
              <a
                href={
                  file.hasOwnProperty("url")
                    ? file.url
                    : file.hasOwnProperty("alternateLink")
                    ? file.alternateLink
                    : ""
                }
                target="_blank"
              >
                <i className="fas fa-eye fa-2x"></i>
              </a>
            </td>
            <td>
              <a
                id={index}
                href="#"
                target=""
                onClick={() => this.handleFileDelete(index)}
              >
                <i className="fas fa-trash-alt fa-2x"></i>
              </a>
            </td>
          </tr>
        ))
      : "";
  }
  
  render() {
    const { instructionsField, titleField, driveFileNameField } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-11">
            <a href="#" target="" variant="secondary" onClick={(e) => this.handleClick('cancel')}>
            <i className="fas fa-window-close fa-2x"></i> 
            </a>
          </div>
          <div className="col-1">
            <Button id={this.state.submitButtonText} 
              variant="primary"
              type="submit"
              disabled={this.state.isSubmitDisabled}
              onClick={(e) => this.handleClick(e.target.id)}
            >
              {this.state.submitButtonText}
            </Button>
          </div>
        </div>
        <div>
          {this.state.isLoading ? (
              <img src={loaderRandomGifs()} className="loaderIcon" />
            ) : (
              ""
            )}
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
              defaultValue= {this.state.assignmentToEdit ? this.state.assignmentToEdit.title: ""}
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
              name={INSTRUCTIONS_FIELD}
              defaultValue= {this.state.assignmentToEdit ? this.state.assignmentToEdit.description: ""}
              //placeholder="Class 3A"
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <DriveFileTypeDropdown 
            dropdownTitleText={actionButtonText.ADD}
            itemList={addFileTypeList}
            itemSelection={this.addFileSelected}
          />
          <DriveFileTypeDropdown 
            dropdownTitleText={actionButtonText.CREATE} 
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
          <div className="modal" ></div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={() => this.setState({ showDriveFileModal: false })} >Cancel</Button>
              <Button variant="primary" onClick={this.createDriveFiles} >Go!</Button>
            </div>
        </Modal>
        <table className="col-12 table table-stripped">
          {this.renderStrippedTable(this.state.driveFiles)}
          </table>
      </div>
    );
  }
}
