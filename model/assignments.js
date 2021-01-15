const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    materials: [
      {
        driveFile: {
          driveFile: {
            alternateLink: {type: String,} ,
            title: {type: String,} ,
          },
          shareMode: {type: String,},  //VIEW, EDIT, STUDENT_COPY, UNKNOWN_TYPE
        }
      },
      {
         form: {
          formUrl: {type: String,} ,
          title: {type: String,} ,
          responseUrl: {type: String,} ,
        }
      },
      {
        link: {
        title: {type: String,} ,
        thumbnailUrl: {type: String,} ,
        }
      },
      {
        youtubeVideo: {
          id: {type: String,} ,
          title: {type: String,} ,
          alternateLink: {type: String,} ,
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignments", assignmentSchema);
