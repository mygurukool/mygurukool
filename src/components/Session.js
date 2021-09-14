/* global gapi */

import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "..//scss/comman.scss"
import Header from "./Header";
import { Redirect } from "react-router";
import * as _apiUtils from "./util/AxiosUtil";
import google from "./../assets/google.png";
import microsoft from "./../assets/microsoft.png";

import * as _constants from "./util/constants";
import * as _gconsts from "./util/gConsts";
import * as _msconsts from "./util/msConsts";

import { ReactComponent as Microsoft } from '../assets/icons/microsoft.svg'
import { ReactComponent as Google } from '../assets/icons/google.svg'
import { ReactComponent as Organization } from '../assets/icons/organization.svg'

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false, accessToken: "" };

    sessionStorage.setItem(_constants.LOGIN_PROVIDER, "");
    sessionStorage.setItem(_constants.ACCESS_TOKEN, "");
  }

   render() {
    return (
      <Fragment>
        <Header isSignedIn={this.state.isSignedIn} />
        <div className="container">
          <div className="row section-nav">
            <div>
              <h2 className="title-4 text-center">
                Please sign in using your School account.
              </h2>
              <div className="flex-row ">
              <button
                className="border-shadow box-btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  let stateNow = new Date()
                    .toISOString()
                    .replace(/[^0-9]/g, "")
                    .slice(0, -3);
                  let random = Math.random().toString(36).substring(7);

                  sessionStorage.setItem(
                    _constants.LOGIN_PROVIDER,
                    _constants.MICROSOFT
                  );

                  window.location.href =
                    "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=" +
                    process.env.REACT_APP_CLIENT_ID +
                    "&response_type=id_token%20token&redirect_uri=" +
                    process.env.REACT_APP_OAUTH_REDIRECT_URI +
                    "&response_mode=fragment&scope=openid%20" +
                    _msconsts.REACT_APP_OAUTH_SCOPES +
                    //    "&prompt=consent" +
                    "&state=" +
                    stateNow +
                    "&nonce=" +
                    random;
                }}
              >
                <Microsoft />
                Login With Microsoft Account
              </button>

              <button
                className="border-shadow box-btn"
                type="button"
                onClick={(e) => {
                  sessionStorage.setItem(
                    _constants.LOGIN_PROVIDER,
                    _constants.GOOGLE
                  );
                  window.gapi.auth2.getAuthInstance().signIn();
                }}
              >
               <Google />
                Login With Google Account
              </button>
              <button
                className="border-shadow box-btn">
                  <Organization />
                      Organization
                </button>
              </div>
              <h2 className="title-5 text-center">Don't have account?, please <button type="button" className="simple-link">Signup</button> here</h2>
              
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
