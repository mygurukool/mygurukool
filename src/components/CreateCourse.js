import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";
import { ReactComponent as RightArrowIcon } from '../assets/icons/arrow.svg'
import { ReactComponent as CrossIcon } from '../assets/icons/cross-white.svg'
export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      courseName: "",
      showCourseModal: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = async () => {
    let resp = await _classworkUtil
      .createCourse(this.state.courseName, this.state.className)
      .then(res => res);
      // .then((res) => {
      //   console.log(res);
      // });
      //alert(JSON.stringify(resp))
      console.log(resp);

      // _classworkUtil
      // .createCourse(this.state.courseName, this.state.className)
      // .then((res) => {
      //   console.log("CreateCourse: " + res);
      // });

    this.props.hideCreateCourse(false);
  };

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };

  render() {
    const { className, courseName } = this.state;
    return (
      // {"create course"}
      <Modal
        show={this.state.showCourseModal}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <div className="card-header bg-green">
          <h5 className="card-title m-0 txt-white">Create Course</h5>
        </div>
          <div className="card card-body">
             
            <Form>
              <Form.Group controlId="formCreateCourse">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="courseName"
                  name="courseName"
                  className="form-control input-field mb-3"
                  placeholder="eg: English, French"
                  onChange={(e) => this.handleChange(e)}
                />

                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}

                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  type="className"
                  name="className"
                  className="form-control input-field mb-3"
                  placeholder="Name of the Class the Course should belong to. eg: Class 3A"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <div className="create-btn d-flex justify-content-center">
                <Button  type="cancel" className="btn-red  bg-grey bg-green txt-white m-0 mr-1" >
                  Cancel
                  <CrossIcon />
                </Button>
                <Button
                  type="submit"
                  className="btn-red bg-green txt-white m-0 ml-1"
                  onClick={this.handleClick}
                >
                  Create
                  <RightArrowIcon />
                </Button>
              </div>
            </Form>
            {/* <button
            type="button"
            className="btn btn-primary turnin"
           // disabled={!this.props.isActive}
            onClick={this.handleClick}
          >
            Close
          </button> */}
          </div>
      </Modal>
    );
  }
}
