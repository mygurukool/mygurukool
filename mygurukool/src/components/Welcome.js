import React from "react";
import { Button } from "react-bootstrap";
import TeacherAuthorization from "./google/TeacherAuthorization";
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWelcomeScreen: true, teacherAuthentication:false };
  }

  handleClick = () => {
    this.setState({
      showWelcomeScreen: false,
      teacherAuthentication: true,
    });
    this.props.welcomeAction(true);
  };

  render() {
    //   alert(this.props.groupCount)
    return (
      <div className="container">
        {this.state.showWelcomeScreen ? (
          <div className="card card-body">
            <div className="row-12">
              <b>Welcome to MyGuruKool!</b>
              <p/>
              Don't see your existing classes?
              <br />
              <br />
              If this is your first login here, please select your profile to start using your MyGuruKool Account.
              <br />
              <div className="col-12">
                <div className="col-6 card-body">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleClick}
                  >
                    + Create a Course, I'm a Teacher!
                  </Button>
                  <br />
                  If you have already created a Course, please login to https://classroom.google.com and accept the course invitation
                </div>
                <div className="col-6 card-body">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleClick}
                  >
                    Im Student
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.teacherAuthentication && !sessionStorage.getItem("hasTeacherAccepted") ? (
              <TeacherAuthorization />):""
        }
      </div>
    );
  }
}
