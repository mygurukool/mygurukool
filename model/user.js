const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
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
