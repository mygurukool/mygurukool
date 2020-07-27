import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

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
    this.state = ({customToggle:this.props.customToggle});
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
        {this.props.dropdownTitleText}
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