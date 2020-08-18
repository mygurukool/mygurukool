import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import {actionButtonText} from "./gConsts"

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));


export default class DropdownUtil extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      customToggle:this.props.customToggle,
      displayIcon: null,
    });
    this.getActionIcon = this.getActionIcon.bind(this);
  }

  getActionIcon(action){
    let icon='';
    switch (action) {
      case actionButtonText.ADD: icon = "fas fa-paperclip"; break;
      case actionButtonText.CREATE: icon = "fas fa-plus"; break;
    }
    return icon;
  }

  handleChange = (event) => {
    this.props.itemSelection(event);
  }

  render() {
    return (
    <Dropdown onSelect={(e) => this.handleChange(e)}>
      {this.state.customToggle && this.state.customToggle === true 
      ?(
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {this.props.dropdownTitleText}
        </Dropdown.Toggle>
      ):(
        <Dropdown.Toggle id="dropdown-custom-components"> 
       <i class={this.getActionIcon(this.props.dropdownTitleText)}> {this.props.dropdownTitleText}</i>
        </Dropdown.Toggle>
      )
      }
      <Dropdown.Menu>
      {this.props.itemList && this.props.itemList.map((item)=> {
        return <Dropdown.Item key={item} eventKey={item}><b>{item}</b></Dropdown.Item>;
      })}
      </Dropdown.Menu>
    </Dropdown>
    );
  }
}