const{TeacherValidation} = require('../validation/validationSchema.js')
const  jwt  =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Organization = require('../model/organizationSchema');
const teacherSchema = require('../model/teacherSchema')
var User = require('../model/user');
var {arragneError} = require('../utils/utils');

const readXlsxFile = require("read-excel-file/node");
const Excel = require('exceljs')

const reader = require('xlsx')


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

exports.TeacherImport = async function(req,res){
  try{
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path = `./uploads/` + req.file.filename;
    var {userDetails} = req;
   
  
    // Reading our test file
    const file = reader.readFile(path)
      
    let data = [];
    let errorData = [];
      
    const sheets = file.SheetNames
      
    for(let i = 0; i < sheets.length; i++)
    {
       const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {
          
          var validate = TeacherValidation(res)
          const {value,error} = validate
          
          if(error){
            // const {details} = error
          // var customeError = arragneError(details)
            errorData.push(res)
          }
          data.push(res)
       });
    }
    if(errorData.length != '0'){
      const ws = reader.utils.json_to_sheet(errorData)
      reader.utils.book_append_sheet(file,ws,"Sheet2")
      reader.writeFile(file,path)
    }
    if(data.length !=0){
        data.forEach( (val)  => {
            var users = {
              username:val.username,
              password:bcrypt.hashSync(val.password,10),
              first_name:val.first_name,
              last_name:val.last_name,
              email:val.email,
              country:val.country
            }
            let user = new User(users);
            user.save()
            val.orgId = userDetails.data.org._id
            val.organization = userDetails.data.org.orgName
            val.userId = user._id

          const org = new teacherSchema(val)
          org.save();

        });
    }

    return res.status(200).send("upload successfully");

  }catch(error){
    console.log('error')
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
 
}
