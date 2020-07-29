/*global gapi*/
import * as _apiUtils from "../util/AxiosUtil";
import * as _gconsts from "../util/gConsts";

export let user = {
  name: "Name",
  group: ["Group Name",],
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

function reCreateCourseWork(coursework){

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

function reCreateCourse(courseParam){
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

export function createCourse(courseName, className){
  const courseContent = { name : courseName, ownerId: "me", section: className};
  _apiUtils.googleClassroomCreateCourse(courseContent).then((response) => {
    alert(response)
    console.log("createCourse " + response);  
  });

  // return new Promise((resolve, reject) => {
  //   _apiUtils.googleClassroomCreateCourse(courseContent).then((response) => {
  //     resolve(response)
  //     console.log("createCourse " + response);  
  //   }).catch((error) => {
  //       reject(error); console.error("Error during createCourse:", error);
  //     });
  //   })

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

export function loadAssignments(courseId, associatedWithDeveloperCheck){
      return new Promise((resolve, reject) => {
        _apiUtils.loadGoogleAssignments(courseId)
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

//TODO: currently not used.. to be deleted in near future should this function is not needed anymore
export function destructClassname_Courses(courses){
  let destructObj = {courses:[], group: null};
  alert("destructClassname_Courses: " + courses.length)
  courses && courses.map((course) => {
    if(destructObj.group === null) destructObj.group = course.name.substring(0, course.name.indexOf("-"));
     course.name = course.name.split(/[\-]+/).pop().trim();
     destructObj.courses.push(course);
  });
  console.log("group/ coursename: " + JSON.stringify(destructObj));
}

export function fetchGroupList(courses){
  let groupList = [];
  courses && courses.map((course) => {
    let name = course.section;
    if(name===null || typeof(name) === 'undefined') {name = 'undefined'} //TODO: temp for Sudha's testing, to be deleted
    //if(name!==null && typeof(name) !== 'undefined' && !groupList.includes(name)) groupList.push(name) //TODO enable this when the testing code is deleted
    if(!groupList.includes(name)) groupList.push(name);
  });
  return groupList;
}

export function coursesByGroupName(courses, groupName){
  let coursesByGroup = [];
  courses && courses.map((course) => {
    if(course.section === groupName) coursesByGroup.push(course);
    else if(groupName === 'undefined') coursesByGroup.push(course); //TODO: temp for Sudha's testing, to be deleted
  });
  return coursesByGroup;
}

export function getDriveFileLink(name, contentType, driveId=""){
  let formUrl;
  let mime;
  let fileType
  switch (contentType) {
    case _gconsts.driveFileTypes.DRIVE_FORMS: mime = 'application/vnd.google-apps.form'; fileType = 'forms'; break;
    case _gconsts.driveFileTypes.DRIVE_DOCS: mime = 'application/vnd.google-apps.document'; fileType = 'document'; break;
    case _gconsts.driveFileTypes.DRIVE_SLIDES: mime = 'application/vnd.google-apps.presentation'; fileType = 'presentation'; break;
    case _gconsts.driveFileTypes.DRIVE_SHEETS: mime = 'application/vnd.google-apps.spreadsheet'; fileType = 'spreadsheets'; break;
    case _gconsts.driveFileTypes.DRIVE_DRAWINGS: mime = 'application/vnd.google-apps.drawing'; fileType = 'drawings'; break;
  }
  return new Promise((resolve, reject) => {
    _apiUtils
    .googleClassroomCreateDriveFile(name, mime, driveId)
    .then((response) => {
      console.log(response)
      formUrl= `https://docs.google.com/${fileType}/d/${response.data.id}/edit`
      resolve(formUrl)
    })
    .catch((error) => {reject(error); console.error("Error during getFormLink:", error);
    });
  })
}

export function autoAcceptCourseInvitation(){
  _apiUtils.googleClassroomGetInvitations().then((response) => {
    console.log("googleClassroomGetInvitations " + JSON.stringify(response))
    _apiUtils.googleClassroomAcceptInvitation(response.data.nextPageToken).then((response) => {
      console.log("googleClassroomAcceptInvitation: " + response)
    })
  })
}

export function createCourseWork(coursework){
  let courseId = coursework.courseId;
  let courseWork = {title: coursework.title, description: coursework.instructions, workType:coursework.workType,
                    associatedWithDeveloper: true, state:'PUBLISHED', //maxPoints: 1
                    materials: [],   
                  };

  let materials= []
  coursework.driveFiles.map((file) => { 
    if(file.type === _gconsts.driveFileTypes.DRIVE_FORMS){
      materials=
      {
        "link": {
          "url": file.url,
        }
      }
    } 
    // else if(file.type === _gconsts.driveFileTypes.DRIVE_DOCS){
    //   materials=
    //   {
    //     "form": {
    //       "formUrl": file.url,
    //       "title": file.name,
    //     }
    //   }
    // } 
  })
  courseWork.materials.push(materials);
  console.log("createCourseWork: " + JSON.stringify(courseWork));

  // let materials:[
  //     {driveFile:
  //       {"driveFile":
  //         {"id":"1TBdLNWckTjsW-Izh0EzThq36qeceS47f",
  //         "title":"cs101-assignment-material.txt",
  //         "alternateLink":"https://drive.google.com/open?id=1TBdLNWckTjsW-Izh0EzThq36qeceS47f",
  //         "thumbnailUrl":"https://drive.google.com/thumbnail?id=1TBdLNWckTjsW-Izh0EzThq36qeceS47f&sz=s200"
  //         },
  //         "shareMode":"VIEW"
  //       }
  //     }
  //   ],
    // "state":"PUBLISHED",
    // "alternateLink":"https://classroom.google.com/c/MTI4MDIzNTgxNTQ0/a/MTI4MDMyNzU2NjAy/details",

    // "workType":"ASSIGNMENT",
    // "submissionModificationMode": "MODIFIABLE_UNTIL_TURNED_IN",
    // "assignment":
    //   {
    //     "studentWorkFolder":
    //       {
    //         "id":"0B2DpClxEXO3sflNOR2NMUDdXMkp0bmpHWEM4bE5MeEhEMndQYWpCN1Q3UDNPaktJNU8zYXM",
    //         "title":"CourseWork 101 - API Test Again Baby",
    //         "alternateLink":"https://drive.google.com/drive/folders/0B2DpClxEXO3sflNOR2NMUDdXMkp0bmpHWEM4bE5MeEhEMndQYWpCN1Q3UDNPaktJNU8zYXM"
    //       }
    //     },
    //     "assigneeMode":"ALL_STUDENTS",


  //creating coursework
  return new Promise((resolve, reject) => {
    _apiUtils
        .googleClassroomCreateCourseWork(courseId, courseWork)
        .then((response) => {
            console.log("googleClassroomCreateCourseWork: "+ JSON.stringify(response));
            resolve(response);
        }).catch((error) => {reject(error); console.error("Error during google CreateCourseWork:", error)});
      })
  }
