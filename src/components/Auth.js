import React from "react";
import { Redirect } from "react-router";
import * as Constants from "./util/constants";

export default class Auth extends React.Component {
  render() {
    let iparams = new URLSearchParams(this.props.location.hash);
    sessionStorage.setItem("token", iparams.get("#access_token"));
    sessionStorage.setItem("loginProvider", Constants.MICROSOFT);

    return <Redirect to="/home" />;
  }
}
