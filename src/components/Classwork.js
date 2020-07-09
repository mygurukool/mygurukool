import React, { Component, Fragment } from "react";
import MSCourse from "./microsoft/Student";
import GoogleCourse from "./google/Course";
import * as _constants from "./util/constants";

export default class Classwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
    this.handleUserDataFromProvider = this.handleUserDataFromProvider.bind(
      this
    );
  }

  handleUserDataFromProvider = (userData) => {
    this.props.userData(userData);
  };

  render() {
    return sessionStorage.getItem(_constants.LOGIN_PROVIDER) ===
      _constants.MICROSOFT ? (
      <MSCourse userData={this.handleUserDataFromProvider} />
    ) : (
      <GoogleCourse userData={this.handleUserDataFromProvider} />
    );
  }
}
