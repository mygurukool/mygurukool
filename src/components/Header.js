import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
          <div className="container">
            <a className="navbar-brand mr-0 mr-md-2 logo">My Gurukool</a>
            <ul className="navbar-nav ml-md-auto">
              <li className="nav-item">
                <a
                  className="far fa-user"
                  href="#?"
                  //onClick=
                >
                  <li>Signout</li>
                </a>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </header>
      </Fragment>
    );
  }
}
