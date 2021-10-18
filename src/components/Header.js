/* global gapi */
import React, { Component, Fragment } from "react";
import * as _apiUtils from "./util/AxiosUtil";
import * as _constants from "./util/constants";
import * as _gconsts from "./util/gConsts";
import * as _msconsts from "./util/msConsts";
import "..//App.css";
import "..//scss/comman.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactComponent as User } from '../assets/images/home-img/Person.svg'
import { ReactComponent as Logout } from '../assets/images/home-img/logout.svg'
import {Link} from "react-router-dom";
export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentWillMount() {
    let isLoggedIn = sessionStorage.getItem(_constants.ACCESS_TOKEN, "") !== "";
    this.setState({ isLoggedIn: isLoggedIn});
  }

  render() {
    return (
      <Fragment>

        <header className="home-header">
          <div className="container">
            <div  className="header-content">
              <div className="header-left">
                <h2>My Gurokool (BETA)</h2>
              </div>
              <div className="header-right">
                  <ul className="navbar-items">
                    <li className="nav-item">
                      <a className="d-flex align-items-center">
                        <User/>
                        {this.props.studentName}
                      </a>

                    </li>
                    {this.state.isLoggedIn ? (
                      <li className="nav-item">
                        <Link to="/class/create" className="btn-red text-white">Create class</Link>
                      </li>
                    ):''}
                    <li>
                    {this.props.isSignedIn ? (
                        <a
                          className="logout btn-red text-white"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            let provider = sessionStorage.getItem(
                              _constants.LOGIN_PROVIDER
                            );

                            if (provider === _constants.GOOGLE) {
                              gapi.auth2.getAuthInstance().signOut();
                              // Disconnect will logoff gmail login to all the google sessions in the browser
                              // gapi.auth2.getAuthInstance().disconnect();  
                              //_apiUtils.googleLogout(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token);
                            } else {
                              window.location.href =
                                "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=" +
                                process.env.REACT_APP_OAUTH_LOGOUT_URI;
                            }
                            sessionStorage.clear();
                          }}
                        >
                          <Logout/>
                          Logout
                        </a>
                      ) : ""}
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    );
  }
}
