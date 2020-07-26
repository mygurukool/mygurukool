import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";

export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      courseName: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    _classworkUtil
      .createCourse(this.state.courseName, this.state.className)
      .then((res) => {
        console.log(res);
      });
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
      <div className="container">
        <div className="card card-body fileblock">
          <Form>
            <Form.Label><b>Create Course</b></Form.Label>
            <Form.Group controlId="formCreateCourse">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="courseName"
                name="courseName"
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
                placeholder="Name of the Class the Course should belong to. eg: Class 3A"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Button variant="secondary" type="cancel">
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={this.handleClick}>
              Create
            </Button>
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
      </div>
    );
  }
}
