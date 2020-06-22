import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Redirect } from "react-router";

const CLIENT_ID =
  "629959808842-k1hnr6f2pkfbv9n1fnekpn8gkl659crc.apps.googleusercontent.com";

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
    if (response.access_token) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.access_token,
      }));
      sessionStorage.setItem("token", response.access_token);
      alert("sessionStorage: " + response.access_token);
      return <Redirect to="/home" />;
    } else {
      alert("no sessionStorage: " + response.access_token);
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
    return (
      <Fragment>
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              {this.state.isLogined ? (
                <GoogleLogout
                  clientId={CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={this.logout}
                  onFailure={this.handleLogoutFailure}
                ></GoogleLogout>
              ) : (
                <GoogleLogin
                  className="btn btn-lg btn-submit btn-block float-right"
                  clientId={CLIENT_ID}
                  buttonText="Sign-in with Google Login"
                  onSuccess={this.login}
                  onFailure={this.handleLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  responseType="token" //code,
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
