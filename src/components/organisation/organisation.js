import React, { Component, Fragment } from "react";
import PageBanner from '../../assets/bg.jpg'
import Header from "../Header";
import "../../scss/comman.scss"
import { ReactComponent as RightArrowIcon } from '../../assets/icons/arrow.svg'
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
        this.state = { isSignedIn: false, accessToken: "" };
      }

    
    render(){
        const size = [
            {'name':'1-10',value:'1-10'},
            {'name':'10-20',value:'10-20'},
            {'name':'20-30',value:'20-30'},
            {'name':'30-40',value:'30-40'},
        ]
        const{create,country} = this.props

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
                                <h2 className="title-2 text-center text-blue">Please fill the details</h2>
                            </div>
                            <Col md="6">
                                <FormGroup className="has-success">
                                    <Input
                                    className="is-valid form-control input-field"
                                    placeholder="My Name"
                                    type="text"
                                    name="first_name"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="has-success">
                                    <Input
                                    className="is-valid form-control input-field"
                                    placeholder="My Login Name"
                                    type="text"
                                    name="username"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="has-danger">
                                    <Input
                                    className="is-invalid form-control input-field"
                                    placeholder="Enter Password"
                                    type="password"
                                    name="password"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="has-danger">
                                    <Input
                                    className="is-invalid form-control input-field"
                                    placeholder="Repeat Password"
                                    type="password"
                                    name="password"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="has-success">
                                    <Input
                                    className="is-valid form-control input-field"
                                    placeholder="My Organisation"
                                    type="password"
                                    name="orgName"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="has-success">
                                    <select className="form-control  input-field" name="orgSize" placeholder="size">
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
                                <select className="form-control input-field" name="orgCountry" placeholder="size">
                                    <option value="in">India </option>
                                    <option value="us">US </option>
                                </select>
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup className="has-success">
                                     <textarea name="orgAddress" className="is-valid form-control input-field" placeholder="address"></textarea>
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