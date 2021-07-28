const express = require('express');
const app = express();
const router = express.Router();

const Course = require('../model/courseSchema');

router.post('/course', async (req,res) => {
  
  const {name, classs, description, ownerId, assignedTo, creationTime, updateTime, courseState} = req.body;

  try {
    
    if(!name || !classs || !description || !ownerId || !assignedTo || !creationTime || !updateTime || !courseState)
    {
      res.status(422).json({error: "Please All Feild"});
    }

    const course = new Course({name, classs, description, ownerId, assignedTo, creationTime, updateTime, courseState});
    await course.save();

    res.status(422).json({error:'Course Submited Successful'});
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;