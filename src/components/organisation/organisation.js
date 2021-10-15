import React, { Component, Fragment } from "react";
import PageBanner from '../../assets/bg.jpg'
import Header from "../Header";
import "../../scss/comman.scss"
import { ReactComponent as RightArrowIcon } from '../../assets/icons/arrow.svg'



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
                            <div className="col-md-6 mt-2">
                                <input name="first_name" className="form-control input-field" placeholder="My Name"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <input name="username" className="form-control input-field" placeholder="My Login Name"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <input name="password" className="form-control input-field" placeholder="Enter Password"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <input className="form-control  input-field" placeholder="Reapeat Password"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <input name="orgName" className="form-control input-field" placeholder="My Organisation"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <select className="form-control  input-field" name="orgSize" placeholder="size">
                                    {
                                        size.map((value,key)=>(
                                            <option value={value.value} key={key}>{value.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 mt-2">
                            { 
                                /*<select className="form-control" name="orgCountry" placeholder="size">
                                    { country.length > 0 ?
                                        country.map((value,key)=>(
                                            <option value={value.value} key={key}>{value.name}</option>
                                        ))
                                    : <>loading...</>}
                                </select>*/
                            }

                                <select className="form-control input-field" name="orgCountry" placeholder="size">
                                <option value="in">India </option>
                                <option value="us">US </option>
                            </select>
                            </div>
                            <div className="col-md-12 mt-2">
                                <textarea name="orgAddress" className="form-control input-field" placeholder="address"></textarea>
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
            </div>
          </Fragment>
        )
    }
}