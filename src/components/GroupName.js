import React, { Component } from "react";
import {DEFAULT_GROUP_NAME} from "./util/constants";

export default class GroupName extends Component {
    constructor(props) {
        super(props);
      }
    
      handleChange = (event) => {
        this.props.groupSelection(event.target.value);
      }
    
      render() {
        let showDefaultGroup = this.props.group.length  >= 1 && this.props.group[0] !== DEFAULT_GROUP_NAME;
        return (
          !showDefaultGroup ? (<b>Group: {DEFAULT_GROUP_NAME}</b>)
          :(
            <form style={{display: 'inline-block'}}onSubmit={this.handleSubmit}>
                <label className="m-0">Group&nbsp;
                <select onChange={this.handleChange}>
                  {this.props.group && this.props.group.map((item)=> {
                      return <option value={item}>{item}</option>;
                  })}
                </select>
                </label>
            </form>
          )
        );
      }
}
