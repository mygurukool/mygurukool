const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name:{
    type:'string',
    require:true,
  },
  classs:{
    type:'string',
    require:true
  },
  description:{
    type:'string',
    require:true
  },
  ownerId:{
    type:'string',
    require:true
  },
  assignedTo:[
    {
      teacherList: {
        type:'string',
        require:true
      }
    }
  ],
  creationTime:{
    type:'string',
    require:true
  },
  updateTime:{
    type:'string',
  },
  courseState: {
    type:'string',
    enum: ['CourseState'],
 }
});

const Course = new mongoose.model('COURSE', courseSchema);
module.exports = Course;