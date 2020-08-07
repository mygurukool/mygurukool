import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import AddPeople from "./AddPeople";
import {getTeachersList, getStudentsList} from "./ClassworkUtil";
import {COURSE_ID} from "../util/constants"

export default class InvitePeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      invitePeopleType: "",
      teachersList:[],
      studentList:[],
    }
    this.setModalData = this.setModalData.bind(this);
  }
  setModalData(invitePeopleType){
    this.setState(
      { showModal: true,
        invitePeopleType: invitePeopleType }
    )
  }
  showAddPeopleModal = (showModal) => {
    alert("showAddPeopleModal " + showModal);
    this.setState(
      { showModal: showModal,})
  };
  onCancel = async () => {
    this.props.showInvitePeople(false);
  };
  addStudent = async () => {
    alert("add addStudent");
    this.setModalData("Student");
  };
  addTeacher = async () => {
    alert("add teacher");
    this.setModalData("Teacher");
    // let resp = await _classworkUtil
    //   .createCourse(this.state.courseName, this.state.className)
    //   .then(res => res);
    // .then((res) => {
    //   console.log(res);
    // });
    //alert(JSON.stringify(resp))
    //console.log(resp);

    // _classworkUtil
    // .createCourse(this.state.courseName, this.state.className)
    // .then((res) => {
    //   console.log("CreateCourse: " + res);
    // });

    //this.props.hideCreateCourse(false);
  };

  componentDidMount (){
    //load assigned teachers list
    getTeachersList(sessionStorage.getItem(COURSE_ID)).then((resTeacherList) => {
      this.setState({teachersList: resTeacherList.data.teachers});
    });
    
    //load assigned students list
    getStudentsList(sessionStorage.getItem(COURSE_ID)).then((resStudentList) => {
      this.setState({studentList: resStudentList.data.students});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="card card-body">
          <Form>
            <div className="alert alert-success">
              <div className="row">
                <div className="col-11">
                  <Form.Label>
                    <b>Invite People to Course</b>
                  </Form.Label>
                </div>
                <div className="col-1">
                  <Button
                    variant="secondary"
                    type="cancel"
                    onClick={this.onCancel}
                  >
                    X
                  </Button>
                </div>
              </div>
            </div>
            <Form.Group controlId="formInviteTeachers">
              <div className="row">
                <div className="col-md-10">
                  <Form.Label>
                    <b>Teachers</b>
                  </Form.Label>
                </div>
                <div className="col-md-2">
                  <a href="" target="_blank" onClick={this.addTeacher}>
                    <i className="fas fa-user-plus fa-1g"></i>
                  </a>
                </div>
              </div>
              <table className="col-12 table table-stripped">
                <tbody>
                {this.state.teachersList.length > 0
                  ? this.state.teachersList.map((teacher) => (
                      <tr>
                        <td>{teacher.profile.name.fullName}</td>
                      </tr>
                    ))
                  : ""}
                </tbody>
              </table>
              <div className="card-body">{/* empty row */}</div>
              <div className="row">
                <div className="col-md-10">
                  <Form.Label>
                    <b>Students</b>
                  </Form.Label>
                </div>
                <div className="col-md-2">
                  <a href="" target="_blank" onClick={this.addStudent}>
                    <i className="fas fa-user-plus fa-1g"></i>
                  </a>
                </div>
              </div>
              <table className="col-12 table table-stripped">
                <tbody>
                {this.state.studentList.length > 0
                  ? this.state.studentList.map((student) => (
                      <tr>
                        <td>{student.profile.name.fullName}</td>
                      </tr>
                    ))
                  : ""}
                  </tbody>
              </table>
            </Form.Group>
          </Form>
          {this.state.showModal ? (
            <AddPeople
              invitePeopleType={this.state.invitePeopleType}
              showAddPeopleModal={this.showAddPeopleModal}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
