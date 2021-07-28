const  jwt  =  require('jsonwebtoken');
const Joi = require('joi'); 
const bcrypt = require('bcrypt');
var User = require('../model/user');
var {arragneError} = require('../utils/utils');

const {
    LoginValidation,
    RegistrationValidation
  } = require('../validation/validationSchema')


const accessTokenSecret = 'youraccesstokensecret';

// Display list of all BookInstances.
exports.Login = async function(req, res) {

  const { body } = req;  
  console.log(body)
  var result = LoginValidation(body)
  const { value, error } = result;

  if(error){
    const {details} = error
    var customeError = arragneError(details)
    res.send(customeError)
  }
       

  User.findOne({ email:value.email }).then((result)=>{
    console.log(result)
      try{
        userdata = result
        data = {id:result._id,name:result.name,email:result.email}
        passwordHash = userdata.password
      
        if(bcrypt.compareSync(req.body.password,passwordHash)){
          
          const  expiresIn  =  1440;
          const  accessToken  =  jwt.sign({data}, 'secretkey23456444', {
          expiresIn:  expiresIn});
          res.cookie('auth',accessToken);
          res.json({'user' : data ,'accessToken' :accessToken})
        }
        else{
          res.send('User Not Exist...')
        }
      }
      catch{
        res.json('Something went wrong..')
      }
 
    }).catch((error)=>{
      console.log(error)
    }); 
 
}

exports.Registration = function(req,res){
 
  const { body } = req;  
  var result = RegistrationValidation(body)
  const { value, error } = result; 


  if(error){
    const {details} = error
    var customeError = arragneError(details)
    res.send(customeError)

  }



  var d = new Date(),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();
  fullYear =  year+'-'+month+'-'+day

  value.email_verified_at = fullYear
  value.date_of_birth = fullYear
  value.status = 1;

  value.password = bcrypt.hashSync(value.password,10);

  const user = new User(value);
  user.save((err, course) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(200).json({
      user,
    });
  });   
}

