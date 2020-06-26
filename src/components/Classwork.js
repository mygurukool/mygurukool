import React, { Component, Fragment } from "react";
import Student from "./microsoft/Student";
import GoogleStudent from "./google/Student";
import * as _constants from "./util/constants";

export default class Classwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: null,
    };
    this.handleStudentDataFromProvider = this.handleStudentDataFromProvider.bind(
      this
    );
  }

  handleStudentDataFromProvider = (studentData) => {
    this.props.studentData(studentData);
  };

  render() {
    return sessionStorage.getItem(_constants.LOGIN_PROVIDER) ===
      _constants.MICROSOFT ? (
      <Student studentData={this.handleStudentDataFromProvider} />
    ) : (
      <GoogleStudent studentData={this.handleStudentDataFromProvider} />
    );
  }
}
