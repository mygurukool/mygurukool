import React, { Component, Fragment } from "react";
import MSCourse from "./microsoft/Student";
import GoogleCourse from "./google/Course";
import * as _constants from "./util/constants";
import {
  Accordion,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItem,
} from "react-accessible-accordion";
//import 'react-accessible-accordion/dist/fancy-example.css';
//import "bootstrap/dist/css/bootstrap.min.css";

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
      <Fragment>
        {/* <button onClick={() => alert("button")} /> */}
        <GoogleCourse
          userData={this.handleUserDataFromProvider}
          isActive={true}
        />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="alert-primary">
                <Accordion
                  allowZeroExpanded={true}
                  //onChange={(e) => this.setState({ openedItems: e })}
                  //preExpanded={false}
                >
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Archived Courses
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <GoogleCourse
                        userData={this.handleUserDataFromProvider}
                        isActive={false}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
    {
      /* CALL Courses for ARCHIVED */
    }
  }
}
