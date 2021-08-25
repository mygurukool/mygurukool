const{TeacherValidation} = require('../validation/validationSchema.js')
const  jwt  =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Organization = require('../model/organizationSchema');
const teacherSchema = require('../model/teacherSchema')
var User = require('../model/user');
var {arragneError} = require('../utils/utils');


exports.Create = async function(req,res) {
    const {body,userDetails} = req;

    var validate = TeacherValidation(body)
    const {value,error} = validate
    
    if(error){
      const {details} = error
      var customeError = arragneError(details)
      res.send(customeError)
    }

    var users = {
      username:value.username,
      password:bcrypt.hashSync(value.password,10),
      first_name:value.first_name,
      email:value.email,
      country:value.country
    }
    
  try {  
  
    const user = new User(users);
    await user.save()

    value.orgId = userDetails.data.org._id
    value.organization = userDetails.data.org.orgName
    value.userId = user._id
    

    const org = new teacherSchema(value)
    await org.save();

    return res.status(201).send({success: "Data Inserted Successfully"});
    
  } catch (error) {
    console.log(error);
  }
}

exports.GetTeachers = async function(req,res){
  var org = await teacherSchema.find().then((result)=>{
              return result
            }).catch((error)=>{
              console.log(error)
            })
  res.json(org)          
}

