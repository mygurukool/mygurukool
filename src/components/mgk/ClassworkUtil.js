import * as _mgkApi from "../util/MgkAPI";
import {DATA_SOURCE, MKG, TITLE_FIELD, INSTRUCTIONS_FIELD, DRIVE_FILE_NAME_FIELD} from "../util/constants"
import { driveFileTypes, addFileTypes } from "../util/gConsts";
import * as _classworkUtil from "../google/ClassworkUtil";

export async function loadSubjects(subjectsStatus) {
  let subjects = await _classworkUtil
    .loadSubjects(subjectsStatus)
    .then((subjectRes) => subjectRes);

  let mgkSubjectsRes
  try {
    mgkSubjectsRes = await loadMgkSubjects()
    .then((mgkSubjectsRes) => mgkSubjectsRes)
    subjects = [...subjects, ...mgkSubjectsRes]
  } catch (error) {
    console.log('error loadSubjects/ mgkSubjects: ' + error)
  }
  return subjects;
}

function loadMgkSubjects() {
  // load courses(Subjects)
  return new Promise((resolve, reject) => {
    _mgkApi
      .mgkLoadSubjects()
      .then((subjectRes) => {
        let resp = renameKey_Id(subjectRes.data.courses);
        addMKGFlag(resp);
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
        console.error("Error during loadMgkSubjects:", error);
      });
  });
}

function loadMgkAssignments(courseId) {
  return new Promise((resolve, reject) => {
    _mgkApi
      .mgkLoadAssignments(courseId)
      .then((response) => {
        //console.log("ClassworkUtil.loadAssignment: " + JSON.stringify(response.data))
        let assignments = renameKey_Id(response.data.assignments);
        resolve(assignments);
      })
      .catch((error) => {
        reject(error);
        console.log("ClassworkUtil.loadMgkAssignments: " + error);
      });
  });
}

export function loadAssignments(courseId, associatedWithDeveloperCheck) {
  if (sessionStorage.getItem(DATA_SOURCE) === MKG)
    return loadMgkAssignments(courseId);
  else
    return _classworkUtil.loadGoogleAssignments(
      courseId,
      associatedWithDeveloperCheck
    );
}

export function createAssignment(coursework) {
  if (sessionStorage.getItem(DATA_SOURCE) === MKG) {
    let courseId = coursework.courseId;

    //creating coursework
    return new Promise((resolve, reject) => {
      _mgkApi
        .createAssignment(courseId, coursework)
        .then((response) => {
          console.log("mgkCreateAssignment: " + JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          console.error("Error during mgk CreateCourseWork:", error);
        });
    });
  } else _classworkUtil.createCourseWork(buildCoursework(coursework));
}

export function patchAssignment(coursework) {
  if (sessionStorage.getItem(DATA_SOURCE) === MKG) {
    let assignmentId = coursework.id;

    //patching coursework
    return new Promise((resolve, reject) => {
      _mgkApi
        .patchAssignment(assignmentId, buildCoursework(coursework, coursework.updateMask))
        .then((response) => {
          console.log("mgkPatchAssignment: " + JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          console.error("Error during mgk PatchAssignment:", error);
        });
    });
  } else _classworkUtil.patchCourseWork(buildCoursework(coursework));
}

function buildCoursework(coursework, updateMask) {
  let courseWork = {
    id: coursework.id,
  };

  updateMask && updateMask.map((item) => {
    if(item === TITLE_FIELD) courseWork.title = coursework.title
    else if(item === INSTRUCTIONS_FIELD) courseWork.description = coursework.description
  })
  //   title: coursework.title,
  //   description: coursework.description,
  //   workType: coursework.workType,
  //   associatedWithDeveloper: true,
  //   state: "PUBLISHED", //maxPoints: 1
  //   materials: [],
  // };
  // let materials = [];
  // let link, youTube, driveFile, responseUrl, thumbnailUrl, alternateLink;
  // coursework.driveFiles.map((file) => {
  //   responseUrl = file.hasOwnProperty("responseUrl") ? file.responseUrl : "";
  //   thumbnailUrl = file.hasOwnProperty("thumbnailUrl") ? file.thumbnailUrl : "";
  //   alternateLink = file.hasOwnProperty("alternateLink")
  //     ? file.alternateLink
  //     : "";

  //   switch (file.type) {
  //     case driveFileTypes.DRIVE_DOCS:
  //     case driveFileTypes.DRIVE_SLIDES:
  //     case driveFileTypes.DRIVE_SHEETS:
  //     case driveFileTypes.DRIVE_DRAWINGS:
  //       driveFile = {
  //         id: file.id,
  //         alternateLink: alternateLink,
  //         title: file.title,
  //         thumbnailUrl: thumbnailUrl,
  //       };
  //       materials.push({ driveFile: { driveFile: driveFile } });
  //       break;
  //     case addFileTypes.LINK:
  //     case driveFileTypes.DRIVE_FORMS:
  //       link = {
  //         url: file.url,
  //         title: file.title,
  //         thumbnailUrl: thumbnailUrl,
  //       };
  //       materials.push({ link: link });
  //       break;
  //     case addFileTypes.YOU_TUBE:
  //       youTube = {
  //         id: file.id,
  //         url: file.url,
  //         title: file.title,
  //         thumbnailUrl: thumbnailUrl,
  //       };
  //       materials.push({ youtubeVideo: youTube });
  //       break;
  //   }
  // });
  // courseWork.materials = materials;
  console.log("buildCoursework: " + JSON.stringify(courseWork));
  return courseWork;

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
}

function buildCoursework1(coursework) {
  let courseWork = {
    id: coursework.id,
    title: coursework.title,
    description: coursework.description,
    workType: coursework.workType,
    associatedWithDeveloper: true,
    state: "PUBLISHED", //maxPoints: 1
    materials: [],
  };
  let materials = [];
  let link, youTube, driveFile, responseUrl, thumbnailUrl, alternateLink;
  coursework.driveFiles.map((file) => {
    responseUrl = file.hasOwnProperty("responseUrl") ? file.responseUrl : "";
    thumbnailUrl = file.hasOwnProperty("thumbnailUrl") ? file.thumbnailUrl : "";
    alternateLink = file.hasOwnProperty("alternateLink")
      ? file.alternateLink
      : "";

    switch (file.type) {
      case driveFileTypes.DRIVE_DOCS:
      case driveFileTypes.DRIVE_SLIDES:
      case driveFileTypes.DRIVE_SHEETS:
      case driveFileTypes.DRIVE_DRAWINGS:
        driveFile = {
          id: file.id,
          alternateLink: alternateLink,
          title: file.title,
          thumbnailUrl: thumbnailUrl,
        };
        materials.push({ driveFile: { driveFile: driveFile } });
        break;
      case addFileTypes.LINK:
      case driveFileTypes.DRIVE_FORMS:
        link = {
          url: file.url,
          title: file.title,
          thumbnailUrl: thumbnailUrl,
        };
        materials.push({ link: link });
        break;
      case addFileTypes.YOU_TUBE:
        youTube = {
          id: file.id,
          url: file.url,
          title: file.title,
          thumbnailUrl: thumbnailUrl,
        };
        materials.push({ youtubeVideo: youTube });
        break;
    }
  });
  courseWork.materials = materials;
  console.log("buildCoursework: " + JSON.stringify(courseWork));
  return courseWork;

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
}

function renameKey_Id(data) {
  return JSON.parse(JSON.stringify(data).split('"_id":').join('"id":'));
}

function addMKGFlag(data) {
  return data.map((item) => {
    item[DATA_SOURCE] = MKG;
  });
}
