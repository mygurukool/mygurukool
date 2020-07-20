/*global gapi*/
import * as _apiUtils from "../util/AxiosUtil";
import * as _gconsts from "../util/gConsts";


/**
 * Check for AssociatedWithDeveloper flag on Assignments.
 * if "true" do nothing, the courseWork is owned by School App
 * else copy and re-create the course with School App.
 */
function associatedWithDeveloperAction(course, assignments) {
    assignments && assignments.map((assignment) => {
      if (assignment && !assignment.hasOwnProperty("associatedWithDeveloper")) {
          /**TODO: 
           * Fetch the course from gc
           * Create the Course first and then CourseWork, including studentSubmissions
           * send invitations to teachers and students
           * Set the old course status to Archived
           */

        //creating the course
        createCourse(course);
      }
    });
}

function createCourse(courseParam){
 /**
   * { X description, "room", "section"
      "id": "128158816977",
 x     "name": "Mathematics Testing permission",
 x     "descriptionHeading": "Mathematics Testing permission",
 x     "ownerId": "106139693665068244927",
      "creationTime": "2020-07-06T19:14:08.926Z",
      "updateTime": "2020-07-06T19:14:07.962Z",
      "enrollmentCode": "7j22x4w",
 x     "courseState": "ACTIVE",
      "alternateLink": "https://classroom.google.com/c/MTI4MTU4ODE2OTc3",
      "teacherGroupEmail": "Mathematics_Testing_permission_teachers_e6108e6b@classroom.google.com",
      "courseGroupEmail": "Mathematics_Testing_permission_2bc98b0b@classroom.google.com",
  x    "teacherFolder": {
  x      "id": "0B2DpClxEXO3sfmxjV2dkU09wVlE0SVlKSHcxMGhLeVBoOEtBNHVxNzdYVUQ0Qml3SG9DZ0E",
        "title": "Mathematics Testing permission",
        "alternateLink": "https://drive.google.com/drive/folders/0B2DpClxEXO3sfmxjV2dkU09wVlE0SVlKSHcxMGhLeVBoOEtBNHVxNzdYVUQ0Qml3SG9DZ0E"
      },
      "guardiansEnabled": false,
      "calendarId": "classroom106342032861315876778@group.calendar.google.com"
    }
   */
  
  // function fnHasOwnProperty(obj, key){
  // return obj.hasOwnProperty(key) ? obj.key:""
  // }
  const teacherFolder = { id: courseParam.teacherFolder.hasOwnProperty("id") ? courseParam.teacherFolder.id : ""}

  const courseContent = { name : courseParam.name, ownerId: "me", //courseState: _gconsts.COURSE_ACTIVE,
    description: courseParam.hasOwnProperty("description") ? courseParam.description:"", 
    descriptionHeading: courseParam.hasOwnProperty("descriptionHeading") ? courseParam.descriptionHeading :"",
    room: courseParam.hasOwnProperty("room") ? courseParam.room :"",
    section: courseParam.hasOwnProperty("section") ? courseParam.section :"",
    teacherFolder: teacherFolder
  }
  //const courseToCreate = {course: courseContent}
//  execute();

  _apiUtils.googleClassroomCreateCourse(courseContent).then((response) => {
    console.log(response);
    //creating coursework
//     _apiUtils
//         .googleClassroomCreateCourseWork(assignment)
//         .then((response) => {
//             console.log(response);
//         });
//   });
});
}

// function execute() {
//   gapi.client.load('classroom', 'v1', callback);
//   return gapi.client.classroom.courses.create({
//     "name":"test",
//     "resource": {}
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }

export function loadAssignments(course, associatedWithDeveloperCheck){
      return new Promise((resolve, reject) => {
        _apiUtils.loadGoogleAssignments(course.id)
        .then((response) => {
            //console.log("ClassworkUtil.loadAssignment: " + JSON.stringify(response.data))
            let assignments = response.data.courseWork;
            if(associatedWithDeveloperCheck){
              associatedWithDeveloperAction(course, assignments);
            }
            resolve(assignments)
        })
        .catch((error) => {reject(error); console.log("ClassworkUtil.loadAssignment: " + error)});
      })
}

