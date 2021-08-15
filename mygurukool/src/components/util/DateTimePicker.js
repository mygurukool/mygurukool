

import React from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";

let inputProps = {
    placeholder: "No due date",
    //disabled: false,
   // onMouseLeave: () => alert("Select desired due date!")
  };
  
export default class DateTimePicker extends React.Component {
    render() {
      return <Datetime inputProps={inputProps} isValidDate={valid} />;
    }
  }
  
  function valid(current) {
    var yesterday = moment().subtract(1, "day");
      //disable weekends(Satday, Sunday) and dates in the past
    return current.day() !== 0 && current.day() !== 6 && current.isAfter(yesterday);
  }