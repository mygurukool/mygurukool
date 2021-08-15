import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";
import CourseWorkTypeDropdown from "./util/DropdownUtil";
import CourseWorkType from "./CourseWorkType";
import {courseWorkType, courseWorkAction} from "./util/gConsts";

const courseWorkList = Object.keys(courseWorkType).map(key => courseWorkType[key]);

let workTypeObject = { type: "", action: courseWorkAction.EDIT, assignmentToEdit:null };

export default class EditCourseWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCourseWorkType: null,
      courseworkTitle: "Editing Coursework"
    };
    this.showEditCourseWork = this.showEditCourseWork.bind(this);
    workTypeObject.assignmentToEdit = this.props.assignmentToEdit;
    workTypeObject.type = this.props.assignmentToEdit.workType;
  }

  showEditCourseWork(){
    this.props.showEditCourseWork(false);
  }
  

  render() {
    return (
      // {"Edit course"}
      <div className="container">
        <div className="alert alert-success">
          <Form.Label>
            <b>{this.state.courseworkTitle}</b>
          </Form.Label>
        </div>
        {
          <CourseWorkType workTypeData={workTypeObject} showEditCourseWork={this.showEditCourseWork}/>
        }
      </div>
    );
  }
}
