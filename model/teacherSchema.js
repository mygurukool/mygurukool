const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  first_name:{
    type:'string',
    require:true
  },
  last_name:{
    type:'string',
    require:true
  },
  email:{
    type:'string',
    require:true
  },
  organization:{
    type:'string',
    require:true
  },

});

const Teacher = mongoose.model('TEACHER', teacherSchema);

module.exports = Teacher;