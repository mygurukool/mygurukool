import * as _mkgApi from "../util/MgkAPI";

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

function renameKey_Id(data) {
  return JSON.parse(JSON.stringify(data).split('"_id":').join('"id":'));
}

function addMKGFlag(data) {
  return data.map((item) => {
   item['source']='MKG'
  })
}