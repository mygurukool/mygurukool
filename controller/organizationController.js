const{OrganizationValidation} = require('../validation/validationSchema.js')
const Organization = require('../model/organizationSchema');
var {arragneError} = require('../utils/utils');


exports.Create = async function(req,res) {
  const {body} = req;


    var validate = OrganizationValidation(body)
    const {value,error} = validate
    
    if(error){
      const {details} = error
      var customeError = arragneError(details)
      res.send(customeError)
    }
    
    try {  
    const org = new Organization(value)
    await org.save();

    res.status(201).json({success: "Data Inserted Successfully"});
    
  } catch (error) {
    console.log(error);
  }
}

