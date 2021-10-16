import React, {Fragment} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import * as _classworkUtil from "./google/ClassworkUtil";
import axios from "axios";
import Header from "./Header";
import PageBanner from "../assets/bg.jpg";
import {ReactComponent as RightArrowIcon} from "../assets/icons/arrow.svg";

export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      section: "",
      ageGroup: "",
      error:{}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = async (e) => {
    e.preventDefault();
    let data = {
      name: e.target.className.value,
      section: e.target.section.value,
      ageGroup: e.target.ageGroup.value,
    };
    axios.post('http://localhost:4000/api/classes',data).then((result)=>{
      if (result.status === 200) {
        alert("Class created successfully");
      }
    }).catch((error)=>{
      console.log(error)
    })
  };

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      // {"create course"}
      <Fragment>
        <Header isSignedIn={true} />
        <div className="page-banner">
          <img src={PageBanner} alt={"Logo"}/>
        </div>
        <div className="container d-flex align-items-center justify-content-center" style={{height: '85vh'}}>
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <div className="card border-info">
                <div className="card-header bg-green">
                  <h5 className="card-title m-0 txt-white">Create Class</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={((event)=>this.handleClick(event))}>
                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <input name="className" className="form-control input-field" placeholder="class 9"/>
                      </div>
                      <div className="col-md-12 mt-3">
                        <input name="section" className="form-control input-field" placeholder="A"/>
                      </div>
                      <div className="col-md-12 mt-3">
                        <select className="form-control input-field" name="ageGroup" placeholder="ageGroup">
                          <option value="5-8">5-8</option>
                          <option value="8-13">8-13</option>
                          <option value="14-18">14-18</option>
                          <option value="18+">18+</option>
                        </select>
                      </div>
                      <div className="col-md-12 mt-3 text-center create-btn">
                        <button className="btn-red txt-white bg-green">
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
