/* global gapi */

import React, { Component, Fragment, } from "react";
import Tooltip from "react-simple-tooltip"
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "..//scss/common.scss"
import Header from "./Header";
import { Redirect } from "react-router";
import * as _apiUtils from "./util/AxiosUtil";
import google from "./../assets/google.png";
import microsoft from "./../assets/microsoft.png";

import * as _constants from "./util/constants";
import * as _gconsts from "./util/gConsts";
import * as _msconsts from "./util/msConsts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ReactComponent as Microsoft } from '../assets/icons/microsoft.svg'
import { ReactComponent as Google } from '../assets/icons/google.svg'
import PageBanner from '../assets/bg.jpg'
import { ReactComponent as Organization } from '../assets/icons/organization.svg'

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false, accessToken: "", googleSignInCount: 0, };

    sessionStorage.setItem(_constants.LOGIN_PROVIDER, "");
    sessionStorage.setItem(_constants.ACCESS_TOKEN, "");
  }

  componentDidUpdate(){
    alert("componentDidUpdate")
  }

   render() {
    return (
      <Fragment>
        <Header isSignedIn={this.state.isSignedIn} />
        <div className="page-banner">
          <img src={PageBanner} />
        </div>
        <div className="container">
          <div className="row section-nav">
            <div>
              <h2 className="title-4 text-center">
                Please sign in using your School account.
              </h2>
              <div className="flex-row ">
              <button
                className="border-shadow box-btn card-hover"
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
                <div className="icon-circle"><Microsoft /></div>
               <h2> Login With Microsoft Account</h2>
              </button>

              <button
                className="border-shadow box-btn card-hover"
                type="button"
                onClick={(e) => {

                 // let gGSC = sessionStorage.getItem(_constants.GOOGLE_SIGNIN_COUNT)
                 // if(Number.isNaN(gGSC) === true && ) 
                  gapi.auth2.getAuthInstance().signOut();
                  
/*                  this.setState({
                    googleSignInCount: ++ this.state.googleSignInCount,
                  })       
                  sessionStorage.setItem(
                    _constants.GOOGLE_SIGNIN_COUNT, 
                    this.state.googleSignInCount
                  ); 
                  */
                  sessionStorage.setItem(
                    _constants.LOGIN_PROVIDER,
                    _constants.GOOGLE
                  );                  
                  window.gapi.auth2.getAuthInstance().signIn();
               }}
              >
               <div className="icon-circle"><Google /></div>
                <h2>Login With Google Account

                <br/>
                <Tooltip 
                  content="Gmail account may not have logout your session properly, login twice while we log you out" 
                  customCss={`white-space: nowrap;`}>
                    <i className="fas fa-exclamation-triangle">{" "}Attention</i>
                  </Tooltip>
                  </h2>
               </button>
               <button
                className="border-shadow box-btn card-hover">
                  <div className="icon-circle"><Organization /></div>
                      <h2>Organization</h2>
                </button>
              </div>
              <h2 className="title-5 text-center">Don't have account?, please <Link className="simple-link" to='/organisation'>Signup</Link> here</h2>
              <br />
              {      
    //ggg.signOut()
}
  {  
                
                //sessionStorage.getItem(                  _constants.GOOGLE_SIGNIN_COUNT                ) >= 1 
                  //? 
                  <div >
                  <Tooltip content="Your session">
                    <i className="fas fa-exclamation-triangle"></i>
                  </Tooltip>
                </div>
               //   : ""
                }
             </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
