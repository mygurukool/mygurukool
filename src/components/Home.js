import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { Redirect } from "react-router";
import * as _apiUtils from "./util/AxiosUtil";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSignedIn: true });
  };

  render() {
    if (this.state.isSignedIn) {
      // redirect to home if signed up
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return (
      <Fragment>
        <Header isSignedIn={this.state.isSignedIn} />
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-success">
                Please sign in using your Microsoft Work or School account.
              </div>
              <button
                className="btn btn-lg btn-submit btn-block"
                type="button"
                onClick={(e): void => {
                  e.preventDefault();
                  let stateNow = new Date()
                    .toISOString()
                    .replace(/[^0-9]/g, "")
                    .slice(0, -3);
                  let random = Math.random().toString(36).substring(7);

                  window.location.href =
                    "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=" +
                    process.env.REACT_APP_CLIENT_ID +
                    "&response_type=id_token%20token&redirect_uri=" +
                    process.env.REACT_APP_OAUTH_REDIRECT_URI +
                    "&response_mode=fragment&scope=openid%20" +
                    process.env.REACT_APP_OAUTH_SCOPES +
                    //    "&prompt=consent" +
                    "&state=" +
                    stateNow +
                    "&nonce=" +
                    random;
                }}
              >
                Login to the School App
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
