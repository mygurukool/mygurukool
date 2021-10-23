import React, { Component, Fragment } from "react";
import PageBanner from '../../assets/org.jpg'
import Header from "../Header";
import "../../scss/common.scss"
import { ReactComponent as RightArrowIcon } from '../../assets/icons/arrow.svg'
import Select from "react-select";
import countryList from 'react-select-country-list'

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";

export default class Organisation extends React.Component{

    constructor(props) {
        super(props);
        this.state = { isSignedIn: false, country: "", accessToken: "" };
    }

    changeHandler = value => {
        this.setState({ country: value});
    }

    render(){
        const {error} = this.props
        console.log(error)
        const options = countryList().getData()
        const size = [
            {'name':'1-10',value:'1-10'},
            {'name':'10-20',value:'10-20'},
            {'name':'20-30',value:'20-30'},
            {'name':'30-40',value:'30-40'},
        ]
        const{create,country} = this.props


        const handleFocus = e => {
            e.target.classList.add("form-success");
        };

        const handleBlur = e => {
            e.target.classList.remove("form-success");
        };

        const handleFocusInvalid = e => {
            e.target.classList.add("form-invalid");
        };

        const handleBlurInvalid = e => {
            e.target.classList.remove("form-invalid");
        };
        return (
          <Fragment>
              <Header isSignedIn={true} />
              <div className="page-banner">
                  <img src={PageBanner} />
              </div>
              <div className="container">
                  <div className="signup-form-center">
                      <form onSubmit={((event)=>create(event))}>
                          <div className="row">
                              <div className="col-md-12">
                                  <h2 className="title-2 text-center orgTitle">Please fill the details</h2>
                              </div>
                              <Col md="6">
                                  <FormGroup>
                                      <Input
                                        className={error.creatorName ? "form-control orgError":'form-control  input-field'}
                                        placeholder="My Name"
                                        type="text"
                                        name="creatorName"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                      />
                                  </FormGroup>
                              </Col>
                              <Col md="6">
                                  <FormGroup>
                                      <Input
                                        className={error.creatorName ? "form-control orgError":'form-control  input-field'}
                                        placeholder="My Login Name"
                                        type="text"
                                        name="username"
                                        onFocus={handleFocusInvalid}
                                        onBlur={handleBlurInvalid}
                                      />
                                  </FormGroup>
                              </Col>
                              <Col md="6">
                                  <FormGroup className="has-danger">
                                      <Input
                                        className="form-control input-field"
                                        placeholder="Enter Password"
                                        type="password"
                                        name="password"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                      />
                                  </FormGroup>
                              </Col>
                              <Col md="6">
                                  <FormGroup className="has-danger">
                                      <Input
                                        className="form-control input-field"
                                        placeholder="Repeat Password"
                                        type="password"
                                        name="password"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                      />
                                  </FormGroup>
                              </Col>
                              <Col md="6">
                                  <FormGroup className="has-success">
                                      <Input
                                        className="form-control input-field"
                                        placeholder="My Organisation"
                                        name="orgName"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                      />
                                  </FormGroup>
                              </Col>
                              <Col md="6">
                                  <FormGroup className="has-success">
                                      <select
                                        className="form-control  input-field"
                                        name="orgSize"
                                        placeholder="size"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                      >
                                          {
                                              size.map((value,key)=>(
                                                <option value={value.value} key={key}>{value.name}</option>
                                              ))
                                          }
                                      </select>
                                  </FormGroup>
                              </Col>
                              <Col md="6">
                                  <FormGroup className="has-success">
                                      {/*<select
                                        className="form-control input-field"
                                        name="orgCountry"
                                        placeholder="size"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                      >
                                          <option value="in">India </option>
                                          <option value="us">US </option>
                                      </select>*/}
                                      <Select className="orgCountry" options={options} name="orgCountry" value={this.state.country} onChange={this.changeHandler} />
                                  </FormGroup>
                              </Col>
                              <Col md="12">
                                  <FormGroup className="has-success">
                                                 <textarea
                                                   name="orgAddress"
                                                   className="form-control input-field"
                                                   placeholder="address"
                                                   onFocus={handleFocus}
                                                   onBlur={handleBlur}
                                                 />
                                  </FormGroup>
                              </Col>
                              <div className="col-md-12 mt-2 text-center create-btn">
                                  <button className="btn-red bg-green txt-white">
                                      Create
                                      <RightArrowIcon />
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </Fragment>
        )
    }
}
