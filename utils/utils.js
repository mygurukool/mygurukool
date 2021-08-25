const  jwt  =  require('jsonwebtoken');

exports.arragneError = function(error){
    var customeError = {}
    error.forEach(function(key,value){
        customeError[key.context.key] = key.message     
      })
    return customeError  
}

exports.isLogin = function(req,res,next){
  var token = req.headers.authorization
  try{ 
    var data = jwt.verify(token,'secretkey23456444')
    req.userDetails = data
    next()
  }catch{
    res.json({message:'Unauthrised...'})
  }
 }
