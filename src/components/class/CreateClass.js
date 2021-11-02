import React, {Fragment} from "react";
import Header from "./../Header";
import PageBanner from "../../assets/classroom.jpg";
import CustomInput from "../custom/CustomInput";

export default class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false, country: "", accessToken: "" };
  }

  render() {
    const{create} = this.props
    return (
      <Fragment>
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
                  <form onSubmit={((event)=>create(event))}>
                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <CustomInput type="text" name="className" placeholder="class 9" required/>
                      </div>
                      <div className="col-md-12 mt-3">
                        <CustomInput type="text" name="section" placeholder="A" required/>
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
