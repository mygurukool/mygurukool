import React, { Component } from "react";

export default class GroupName extends Component {
    constructor(props) {
        super(props);
      }
    
      handleChange = (event) => {
        this.props.groupSelection(event.target.value);
      }
    
      render() {
         
        return (
          <form style={{display: 'inline-block'}}onSubmit={this.handleSubmit}>
              <label>Group&nbsp;
              <select onChange={this.handleChange}>
                {this.props.group && this.props.group.map((item)=> {
                    return <option value={item}>{item}</option>;
                })}
              </select>
              </label>
          </form>
        );
      }
}
