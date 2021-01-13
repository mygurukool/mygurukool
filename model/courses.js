const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    //   "id": string,
    //   "name": string,
    //   "section": string,
    //   "descriptionHeading": string,
    //   "description": string,
    //   "room": string,
    //   "ownerId": string,
    //   "creationTime": string,
    //   "updateTime": string,

    id: {
      type: String,
    },
    name: {
      type: String,
    },
    section: {
      type: String,
      // required: true,
    },
    descriptionHeading: {
      type: String,
    },
    description: {
      type: String,
    },
    room: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    creationTime: {
      type: String,
    },
    updateTime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Courses", courseSchema);
