import * as _mkgApi from "../util/MgkAPI";
import {DATA_SOURCE, MKG} from "../util/constants"
import * as _classworkUtil from "../google/ClassworkUtil"

export function loadMkgSubjects(subjectsStatus) {
  // load courses(Subjects)
  return new Promise((resolve, reject) => {
    _mkgApi
      .mgkLoadSubjects()
      .then((subjectRes) => {
        let resp = renameKey_Id(subjectRes.data.courses);
        addMKGFlag(resp)
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
        console.error("Error during loadMkgSubjects:", error);
      });
  });
}

export function loadMkgAssignments(courseId) {
  return new Promise((resolve, reject) => {
    _mkgApi
      .mgkLoadAssignments(courseId)
      .then((response) => {
        //console.log("ClassworkUtil.loadAssignment: " + JSON.stringify(response.data))
        let assignments = renameKey_Id(response.data.assignments)
        resolve(assignments);
      })
      .catch((error) => {
        reject(error);
        console.log("ClassworkUtil.loadMkgAssignments: " + error);
      });
  });
}

export function createCourseWork(coursework){
}

export function patchCourseWork(coursework){
}

function renameKey_Id(data) {
  return JSON.parse(JSON.stringify(data).split('"_id":').join('"id":'));
}

export function loadAssignments(courseId, associatedWithDeveloperCheck){
  //alert('sessionStorage.getItem(DATA_SOURCE)  ' + sessionStorage.getItem(DATA_SOURCE))
  if(sessionStorage.getItem(DATA_SOURCE) === MKG)
    return loadMkgAssignments(courseId)
  else return _classworkUtil.loadGoogleAssignments(courseId, associatedWithDeveloperCheck)
}

function addMKGFlag(data) {
  return data.map((item) => {
   item[DATA_SOURCE] = MKG
  })
}