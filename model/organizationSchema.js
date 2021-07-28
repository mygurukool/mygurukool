const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  creatorName:{
    type:'string',
    require:true,
  },
  orgName:{
    type:'string',
    require:true
  },
  orgSize:{
    type:'string',
    require:true,
  },
  orgAddress:{
    type:'string',
    require:true
  },
  orgCountry:{
    type:'string',
    require:true
  }
});

const Organization = new mongoose.model("ORGANIZATION", organizationSchema);
module.exports = Organization;