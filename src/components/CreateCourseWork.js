import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";
import CourseWorkTypeDropdown from "./util/DropdownUtil";
import CourseWorkType from "./CourseWorkType";
import {courseWorkType} from "./util/gConsts";

const courseWorkList = Object.keys(courseWorkType).map(key => courseWorkType[key]);

let workTypeObject = { type: "" };

export default class CreateCourseWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCourseWorkType: null,
      courseworkTitle: "Create Coursework"
    };
    this.showCreateCourseWork = this.showCreateCourseWork.bind(this);
  }

  courseWorkTypeSelection = async (courseWorkType) => {
    workTypeObject.type = courseWorkType;
    await this.setState({ selectedCourseWorkType: courseWorkType, courseworkTitle: `Creating ${courseWorkType}` });
  };

  showCreateCourseWork(){
    this.props.showCreateCourseWork(false);
  }

  render() {
    return (
      // {"create course"}
      <div className="container">
        <div className="row-12">
          <Form.Label>
            <b>{this.state.courseworkTitle}</b>
          </Form.Label>
        </div>
        {
          this.state.selectedCourseWorkType === null ? 
          <Fragment>
            <CourseWorkTypeDropdown
            dropdownTitleText="+ Create" 
            itemList={courseWorkList}
            itemSelection={this.courseWorkTypeSelection}
          />
          <div className="row-12">
          Assign work to your class here!!
          Create assignments and questions the way you want students to see it
          </div>
          </Fragment>
          :
          <CourseWorkType workTypeData={workTypeObject} showCreateCourseWork={this.showCreateCourseWork}/>
        }
      </div>
    );
  }
}
