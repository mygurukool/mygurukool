import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";
import axios from "axios";

export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      section: "",
      ageGroup: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = async (e) => {
    e.preventDefault();
    let data = {
      name: this.state.className,
      section: this.state.section,
      ageGroup: this.state.ageGroup,
    };
    axios.post('http://localhost:4000/api/classes',data).then((result)=>{
      if (result.status === 200) {
        alert("Class created successfully");
      }
    }).catch((error)=>{
      console.log(error)
    })
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
        <div className="card card-body">
          <div className="row">
            <div className="col-md-6">
            <Form>
              <Form.Label>
                <b>Create Class</b>
              </Form.Label>
              <Form.Group controlId="formCreateCourse">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  type="text"
                  name="className"
                  placeholder="class 9"
                  onChange={(e) => this.handleChange(e)}
                />

                <Form.Label>Section</Form.Label>
                <Form.Control
                  type="select"
                  name="section"
                  placeholder="A"
                  onChange={(e) => this.handleChange(e)}
                />

                <Form.Label>Age Group</Form.Label>
                <select className="form-control"
                        name="ageGroup" placeholder="size"
                        onChange={(e) => this.handleChange(e)}>
                  <option value="5-8">5-8</option>
                  <option value="8-13">8-13</option>
                  <option value="14-18">14-18</option>
                  <option value="18+">18+</option>
                </select>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => this.handleClick(e)}
              >
                Create
              </Button>
            </Form>
          </div>
        </div>
      </div>
  </div>
  );
  }
  }
