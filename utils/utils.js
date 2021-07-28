exports.arragneError = function(error){
    var customeError = {}
    error.forEach(function(key,value){
        customeError[key.context.key] = key.message     
      })
    return customeError  
}