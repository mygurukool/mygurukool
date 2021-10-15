import React, { Component, Fragment } from "react";
import PageBanner from '../../assets/bg.jpg'
import Header from "../Header";
import "../../scss/comman.scss"
import { ReactComponent as RightArrowIcon } from '../../assets/icons/arrow.svg'



export default class Teachers extends React.Component{

    constructor(props) {
        super(props);
        this.state = { isSignedIn: false, accessToken: "" };
      }

    
    render(){
        
        const{create,error} = this.props
        console.log(error)
        return (
            <Fragment>
            <Header isSignedIn={true} />
            <div className="page-banner">
              <img src={PageBanner} />
            </div>
            <div className="container">
              <div className="row" style={{marginTop:'100px'}}>
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                    <form onSubmit={((event)=>create(event))}>

                      <div className="row">
                          <div className="col-md-6 mt-2">
                              <input name="first_name" className="form-control input-field" placeholder="First Name"/>
                              <span className="error">{error.first_name}</span>
                          </div>
                          <div className="col-md-6 mt-2">
                              <input name="last_name" className="form-control input-field" placeholder="Last Name"/>
                              <span className="error">{error.first_name}</span>
                          </div>
                          <div className="col-md-6 mt-2">
                              <input name="experience" className="form-control input-field" placeholder="Experience"/>
                              <span className="error">{error.experience}</span>

                          </div>
                          <div className="col-md-6 mt-2">
                              <select className="form-control input-field" name="country" placeholder="Country">
                                <option value="in">India </option>
                                <option value="us">US </option>
                            </select>
                            <span className="error">{error.first_name}</span>
                          </div>
                          <div className="col-md-6 mt-2">
                              <input name="email" type="email" className="form-control input-field" placeholder="Email"/>
                              <span className="error">{error.first_name}</span>
                          </div>
                          <div className="col-md-6 mt-2">
                              <input name="password" className="form-control input-field" placeholder="Enter Password"/>
                              <span className="error">{error.first_name}</span>
                          </div>
                          
                          <div className="col-md-12 mt-2">
                              <textarea name="address" className="form-control input-field" placeholder="address"></textarea>
                              <span className="error">{error.first_name}</span>
                          </div>
                          <div className="col-md-12 mt-2 text-center create-btn">
                              <button className="btn-red bg-green txt-white">
                                  Create
                                  <RightArrowIcon />
                              </button>
                          </div>
                      </div>   
                      </form>
                    </div>    
                    <div className="col-md-1"></div>
    
              </div>
            </div>
          </Fragment>
        )
    }
}