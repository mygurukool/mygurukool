const bcrypt = require('bcrypt');
const{TeacherValidation} = require('../validation/validationSchema.js')
const Organization = require('../model/organizationSchema');
var User = require('../model/user');
var {arragneError} = require('../utils/utils');


exports.Create = async function(req,res) {
  const {body} = req;

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
      first_name:value.creatorName,
      country:value.orgCountry,
    }
    
  try {  
  
    const user = new User(users);
    await user.save()
   

    value.creatorId = user._id
    value.creatorName = user.first_name

    const org = new Organization(value)
    await org.save();

    return res.status(201).send({success: "Data Inserted Successfully"});
    
  } catch (error) {
    console.log(error);
  }
}

