import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default class DropdownUtil extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.props.itemSelection(event);
  }

  render() {
    return (
      <DropdownButton
      id="dropdown-basic-button"
      title={this.props.dropdownTitleText}
      onSelect={(e) => this.handleChange(e)}
      >
       {this.props.itemList && this.props.itemList.map((item)=> {
           return <Dropdown.Item eventKey={item}><b>{item}</b></Dropdown.Item>;
       })}
      </DropdownButton>
    );
  }
}