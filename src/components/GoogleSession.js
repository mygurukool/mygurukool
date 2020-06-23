import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Redirect } from "react-router";

export default class GoogleSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: "",
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    if (response.accessToken) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
      sessionStorage.setItem("token", response.accessToken);
      // <Redirect to="/home" />;
      // window.location.href = "localhost:3000";
    }
  }

  logout(response) {
    this.setState((state) => ({
      isLogined: false,
      accessToken: "",
    }));
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  render() {
    if (this.state.isLogined) {
      // redirect to home if signed up
      return <Redirect to={{ pathname: "/home" }} />;
    }

    return (
      <Fragment>
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              {this.state.isLogined ? (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={this.logout}
                  onFailure={this.handleLogoutFailure}
                ></GoogleLogout>
              ) : (
                <GoogleLogin
                  className="btn btn-lg btn-submit btn-block float-right"
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Sign-in with Google Login"
                  onSuccess={this.login}
                  onFailure={this.handleLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  responseType="token" //code,
                  redirectUri="http://localhost:3000/home"
                />
              )}
              {this.state.accessToken ? (
                <h5>
                  Your Access Token: <br />
                  <br /> {this.state.accessToken}
                </h5>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
