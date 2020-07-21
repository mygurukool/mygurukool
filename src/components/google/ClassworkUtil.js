/*global gapi*/
import * as _apiUtils from "../util/AxiosUtil";
import * as _gconsts from "../util/gConsts";

export let user = {
  name: "Name",
  group: "Group Name",
  id: "",
};

export let course = {
  name: "",
  id: "",
};

/**
 * Check for AssociatedWithDeveloper flag on Assignments.
 * if "true" do nothing, the courseWork is owned by School App
 * else copy and re-create the course with School App.
 */
function associatedWithDeveloperAction(course, assignments) {
  //TODO: filer out assignments that are already copied
  // let set = new Set();
  // let unionArray = assignments.filter((assignment) => {
  //   if (!set.has(assignment.title)) {
  //     console.log("true " + assignment.title + "...associatedWithDeveloper: " + assignment.hasOwnProperty("associatedWithDeveloper"));
  //     set.add(assignment.title);
  //     return true;
  //   }
  //   console.log("false: "+assignment.title + "...associatedWithDeveloper: " + assignment.hasOwnProperty("associatedWithDeveloper"));
  //   return false;
  // }, set);
//  console.log("unionArray: " + JSON.stringify(unionArray));

  assignments && assignments.map((assignment) => {
      if (assignment && !assignment.hasOwnProperty("associatedWithDeveloper")) {
          /**TODO: 
           * Fetch the course from gc
           * Create the Course first and then CourseWork, including studentSubmissions
           * send invitations to teachers and students
           * Set the old course status to Archived
           */

        //creating the courseWork
        //createCourseWork(assignment);
      }
    });
}

function createCourseWork(coursework){

  alert("title: " + coursework["title"])
  let courseId = coursework["courseId"];
  delete coursework["courseId"]; 
  delete coursework["id"];
  delete coursework["creationTime"];
  delete coursework["updateTime"];
  delete coursework["creatorUserId"];
  delete coursework["associatedWithDeveloper"];  
  
  /** 
  {
 ==> to del "id":"128032756602",
 ?? ==> to del   "creationTime":"2020-07-05T18:45:43.347Z",
?? ==> to del   "updateTime":"2020-07-05T18:45:42.661Z",
   ==> to del     "associatedWithDeveloper":true,
    ==> to del         "creatorUserId":"106139693665068244927"}

  "title":"CourseWork 101 - API Test Again Baby",
  "description":"CW 101 - Figure out this API again",
  "materials":[
      {"driveFile":
        {"driveFile":
          {"id":"1TBdLNWckTjsW-Izh0EzThq36qeceS47f",
          "title":"cs101-assignment-material.txt",
          "alternateLink":"https://drive.google.com/open?id=1TBdLNWckTjsW-Izh0EzThq36qeceS47f",
          "thumbnailUrl":"https://drive.google.com/thumbnail?id=1TBdLNWckTjsW-Izh0EzThq36qeceS47f&sz=s200"
          },
          "shareMode":"VIEW"
        }
      }
    ],
    "state":"PUBLISHED",
    "alternateLink":"https://classroom.google.com/c/MTI4MDIzNTgxNTQ0/a/MTI4MDMyNzU2NjAy/details",

    "workType":"ASSIGNMENT",
    "submissionModificationMode": "MODIFIABLE_UNTIL_TURNED_IN",
    "assignment":
      {
        "studentWorkFolder":
          {
            "id":"0B2DpClxEXO3sflNOR2NMUDdXMkp0bmpHWEM4bE5MeEhEMndQYWpCN1Q3UDNPaktJNU8zYXM",
            "title":"CourseWork 101 - API Test Again Baby",
            "alternateLink":"https://drive.google.com/drive/folders/0B2DpClxEXO3sflNOR2NMUDdXMkp0bmpHWEM4bE5MeEhEMndQYWpCN1Q3UDNPaktJNU8zYXM"
          }
        },
        "assigneeMode":"ALL_STUDENTS",
  */


  //creating coursework
    _apiUtils
        .googleClassroomCreateCourseWork(courseId, coursework)
        .then((response) => {
            console.log(response);
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

export function loadSubjects(subjectsStatus){
// load courses
  return new Promise((resolve, reject) => {
    _apiUtils
    .loadGoogleSubjects(subjectsStatus)
    .then((subjectRes) => {
      console.log("Course.componentDidMount.userProfile: ", subjectRes);
      resolve(subjectRes.data.courses)
    })
    .catch((error) => {reject(error); console.error("Error during loadGoogleSubjects:", error);
    });
  })
}

export function userProfile(){
  return new Promise((resolve, reject) => {
    _apiUtils
    .userProfile()
    .then((response) => {
      user.id = response.data.id;
      user.name = response.data.name;
      user.group = response.data.family_name;
      resolve(user)
    })
    .catch((error) => {reject(error); console.error("Error during google userProfile:", error);
    });
  })
}

export function isTeacher(userId, courseId){
  return new Promise((resolve, reject) => {
    _apiUtils.googleClassroomCourseTeachersList(courseId).then((resTeacher) =>{
      let isTeacherLogin;
      (userId === resTeacher.data.userId) ? isTeacherLogin = true : isTeacherLogin = false;
      resolve(isTeacherLogin)
    }).catch((error) => {reject(error); console.error("Error during google userProfile:", error)});
  })
}
