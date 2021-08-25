const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    mobile: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    user_type: { 

      type: String, 
      
      enum : ['STUDENT', 'TEACHER'], 
      
      default: 'TEACHER' 
      
      }, 
    role:[],
    permissions:[]
  }
  
)

module.exports = mongoose.model("User", users);
