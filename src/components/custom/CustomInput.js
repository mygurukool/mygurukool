import React from 'react';

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', error: false, validated: false, defaultValue: true, errorMessage: ''};
  }

  validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validate = (event) => {
    if (event.target.attributes.type.value === "text" && event.target.attributes.required !== undefined) {
      if (event.target.value === "") {
        this.setState({error: true, validated: false, defaultValue: false, errorMessage: "This field is required"})
      } else {
        this.setState({error: false, validated: true, defaultValue: false, errorMessage: ""})
      }
    } else {
      this.setState({error: false, validated: true, defaultValue: false, errorMessage: ""})
    }

    if (event.target.attributes.type.value === "email") {
      if (event.target.value === "") {
        this.setState({error: true, validated: false, defaultValue: true, errorMessage: "Please enter your email"})
      } else if (!this.validateEmail(event.target.value)) {
        this.setState({error: true, validated: false, defaultValue: false, errorMessage: "Please enter a valid email"})
      } else {
        this.setState({error: false, validated: true, defaultValue: false, errorMessage: ""})
      }
    }

    if (event.target.attributes.type.value === "password") {
      if (event.target.value === "") {
        this.setState({error: true, validated: false, defaultValue: true, errorMessage: "Please enter your password"})
      } else if (!this.validatePassword(event.target.value)) {
        this.setState({error: true, validated: false, defaultValue: false, errorMessage: "Please enter a valid password"})
      } else {
        this.setState({error: false, validated: true, defaultValue: false, errorMessage: ""})
      }
    }
  }

  render() {
    return (
      <div>
        <div className="custom-input-group">
          <input className={"form-control input-field " + (this.state.error?"has-error":"") + (this.state.validated?"validated":"")} onChange={(event) => this.validate(event)} {...this.props}/>
          <i className={"icon fa fa-" + ((!this.state.defaultValue)?(this.state.error?"times":"check"):"")} style={(this.state.error?{color: 'red'}:{color: 'green'})}/>
        </div>
        {(this.state.error)?(
          <p className="error m-0 p-1" style={{color: 'red', fontSize: '14px'}}>{this.state.errorMessage}</p>
        ):''}
      </div>
    )
  }
}

export default CustomInput
