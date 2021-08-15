import React, { Component } from "react";

class Organisation extends Component {
   
    render(){
        const{create} = this.props
        console.log(this.props)
        return(
            <>
                <div className="container mt-5">
                    <form onSubmit={((event)=>create(event))}>

                        <div className="row">
                            <div className="col-md-6 mt-2">
                                <input name="orgName" className="form-control" placeholder="nme"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <input name="orgSize" className="form-control" placeholder="size"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <input name="orgCountry" className="form-control" placeholder="country"/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <input name="orgAddress" className="form-control" placeholder="address"/>
                            </div>
                            <div className="col-md-12 mt-2 text-center">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </div>   
                    </form>    
                </div>
            </>   
        )
    }
}

export default Organisation