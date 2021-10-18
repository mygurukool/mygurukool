import axios from "axios";
import * as _constants from "./constants";
import * as _gconsts from "./gConsts";
import * as _msconsts from "./msConsts";

export function userProfile() {
  let api_url =
    sessionStorage.getItem("loginProvider") === _constants.GOOGLE
      ? _gconsts.GOOGLE_USERINFO_API
      : _msconsts.REACT_APP_GRAPH_API_URL_BETA;

  return axios.get(api_url + "me", {
    params: {},
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
    },
  });
}

export function googleLogout(token) {
  return axios.get(
    "https://accounts.google.com/o/oauth2/revoke?token=" + token
  );
}

export function loadSite(groupName) {
  return axiosCall("sites/root:/sites/" + groupName);
}

export function loadGoogleSubjects(statusActive) {
  let status = statusActive ? _gconsts.COURSE_ACTIVE : _gconsts.COURSE_ARCHIVED;
  return axiosCall("courses?courseStates=" + status);
}

export function loadSubjects(groupId, studentName) {
  //Exlusive MeWoSchule naming convention issue: replacing '/' with '_' is studentName
  return axiosCall(
    `sites/${groupId}/onenote/sections?$filter=contains(parentSectionGroup/displayName,'${studentName.replace(
      "/",
      "_"
    )}')`
  );
}

export function loadGoogleAssignments(courseId) {
  return axiosCall(`courses/${courseId}/courseWork`);
}

export function loadAssignments(groupId, exerciseId) {
  return axiosCall(`sites/${groupId}/onenote/sections/${exerciseId}/pages`);
  // `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${this.state.sections.value[0].id}/pages`
}

export function loadAssignmentPage(pageUrl) {
  //replacing _msconsts.REACT_APP_GRAPH_API_URL as the url include
  return axiosCall(pageUrl.replace(_msconsts.REACT_APP_GRAPH_API_URL, ""));
}

export function getGoogleStudentUploadedExerciseFiles(courseId, assignmentId = "-") {
  // -- if no assigment Id is specified, returns submissions for all assignments.
  return axiosCall(`courses/${courseId}/courseWork/${assignmentId}/studentSubmissions`);
}

export function getStudentUploadedExerciseFiles(driveId, titleId) {
  return axiosCall(`sites/root/drives/${driveId}/items/${titleId}/children`);
}

export function loadDrivesByGroupId(groupId) {
  return axiosCall(`sites/${groupId}/drives`);
}

export function searchByGroup_Title(groupId, title) {
  return axiosCall(`sites/${groupId}/drive/root/search(q='{${title}}')`);
}

export function uploadStudentExerciseFile(
  formData,
  groupId,
  subjectId,
  exerciseId,
  studentName,
  fileName
) {
  return axios.put(
    _msconsts.REACT_APP_GRAPH_API_URL +
      `sites/${groupId}/drives/${subjectId}/items/${exerciseId}:/${
        studentName.replace("/", "_") + "_" + fileName
      }:/content`,
    // `https://graph.microsoft.com/v1.0/sites/mygurukool.sharepoint.com/drives/b!mMOffAWnMk6LkhxV9lNspegIBJaQEh1Auw7oCGHh4AN3wsxO31WBSJXjoo9fcf91/items/01RYMJ7Z4Y4ILBEY3CBVF3WAF26DLAFX7M:/${this.file.name}:/content`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          _constants.ACCESS_TOKEN
        )}`,
        "Content-Type": "application/octet-stream",
      },
    }
  );
}

export function getBLOB(targetId, exerciseFileType) {
  return axios.get(targetId, {
    params: {},
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      Accept: exerciseFileType,
    },
    responseType: "blob", // important
  });
}

// -- Google Classroom
export function googleClassroomGetCourses() {
  return axiosGet(_gconsts.GOOGLE_CLASSROOM_API + "courses")
}

export function googleClassroomCourseStudentsList(courseId, studentId ="") {
  let url = _gconsts.GOOGLE_CLASSROOM_API + `courses/${courseId}/students`;
  if(studentId !== "") url = url + `/${studentId}`;
  return axiosGet(url)
}

export function googleClassroomCourseTeachersList(courseId, teacherId ="") {
  let url = _gconsts.GOOGLE_CLASSROOM_API + `courses/${courseId}/teachers`;
  if(teacherId !== "") url = url + `/${teacherId}`;
  return axiosGet(url)
}

export function googleClassroomCreateCourse(course) {
  const url = _gconsts.GOOGLE_CLASSROOM_API + "courses"
  return axios.post(url,
    JSON.stringify(course), { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )
}

export function googleClassroomGetCourseworkSubmissions(courseId, courseworkId = "-") {
  // -- if no coursework Id is specified, returns submissions for all courseworks.
   return axiosCall(`courses/${courseId}/courseWork/${courseworkId}/studentSubmissions`);
}

export function googleClassroomSubmissionAddFile(courseId, courseworkId, submissionId, fileId) {
  const attach = {
    addAttachments: [ {
      driveFile: {
        id: fileId
      }
    } ]
  }

  const crw = `courses/${courseId}/courseWork/${courseworkId}/`
  const sub = `studentSubmissions/${submissionId}:modifyAttachments`

  const url = _gconsts.GOOGLE_CLASSROOM_API + crw + sub

  return axios.post(url,
    JSON.stringify(attach), { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )
}

export function googleClassroomSubmissionTurnIn(courseId, courseworkId, submissionId) {
  const crw = `courses/${courseId}/courseWork/${courseworkId}/`
  const sub = `studentSubmissions/${submissionId}:turnIn`

  const url = _gconsts.GOOGLE_CLASSROOM_API + crw + sub

  return axios.post(url,
    {}, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`
    } },
  )
}

export function googleClassroomCreateCourseWork(courseId, coursework) {
  const url = _gconsts.GOOGLE_CLASSROOM_API + `courses/${courseId}/courseWork/`
  
  //alert("Axiosutils.googleClassroomCreateCourseWork: " + JSON.stringify(coursework) + " url: " + url)
  // const courseWorkBlob = new Blob([coursework], {type: 'text/json;charset=utf-8'})  // 'application/json'}) //

  // let data = new FormData()

  // data.append('courseWork', courseWorkBlob)

  return axios.post(url,
    JSON.stringify(coursework), { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )
}

export function googleClassroomPatchCourseWork(courseId, coursework, updateMask) {
  const url = _gconsts.GOOGLE_CLASSROOM_API + `courses/${courseId}/courseWork/${coursework.id}?updateMask=${updateMask}`
  
  return axios.patch(url,
    JSON.stringify(coursework), { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )
}

export function googleClassroomGetInvitations(userId ="me") {
  return axiosGet(_gconsts.GOOGLE_CLASSROOM_API + `invitations?userId=${userId}`)
}

export function googleClassroomCreateInvitation(toCourseId, forUserId, withRole = "STUDENT") {
  const invitation = { courseId: toCourseId, role: withRole, userId: forUserId }

  const url = _gconsts.GOOGLE_CLASSROOM_API + `invitations`

  return axios.post(url,
    JSON.stringify(invitation), { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )
}

export function googleClassroomAcceptInvitation(invitationId) {
  const url = _gconsts.GOOGLE_CLASSROOM_API + `invitations/${invitationId}:accept`

  return axios.post(url,
    {}, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`
    } },
  )
}

// -- Google Drive
export function googleDriveGetFiles(params = {}) {
  // -- get/list all files or folders in the users Google Drive.
  // -- pass "fields": "*" in params to retrive all file fields.
  // --
  // -- use the parameter "q" to apply a search filter:
  // -- https://developers.google.com/drive/api/v3/search-files

  return axiosGet(_gconsts.GOOGLE_DRIVE_API + "files", params);
}

export function googleDriveDownloadFile(fileId) {
  return axiosGet(_gconsts.GOOGLE_DRIVE_API + `files/${fileId}?alt=media`)
}

export function googleDriveUploadFile(name, content, mime, folderId) {
  const meta = { name : name, mimeType: mime }
  if (typeof folderId !== 'undefined') meta.parents = [ folderId ]

  const metaBlob    = new Blob([JSON.stringify(meta)], {type: 'application/json'})
  const contentBlob = new Blob([content], {type: mime});

  let data = new FormData()

  data.append('json', metaBlob)
  data.append('file', contentBlob)

  const upl = "files?uploadType=multipart"
  const url = _gconsts.GOOGLE_DRIVE_UPLOAD_API + upl

  return axios.post(url,
    data, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`
    } },
  )
}

export function googleDriveUpdateFile(name, content, mime, fileId) {
  const meta = { name : name, mimeType: mime }

  const metaBlob    = new Blob([JSON.stringify(meta)], {type: 'application/json'})
  const contentBlob = new Blob([content], {type: mime});

  let data = new FormData()

  data.append('json', metaBlob)
  data.append('file', contentBlob)

  const upl = "files/" + fileId + "?uploadType=multipart"
  const url = _gconsts.GOOGLE_DRIVE_UPLOAD_API + upl

  return axios.patch(url,
    data, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`
    } },
  )
}

export function googleClassroomCreateDriveFile(name, mime, driveId=""){
  const url = _gconsts.GOOGLE_DRIVE_API + "files"
  
  const meta = { name : name, mimeType: mime }

  return axios.post(url,
    meta, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )
}

// -- Google People
export function googlePeopleGetConnections(forUser="me") {
  return axiosGet(_gconsts.GOOGLE_PEOPLE_API + `people/${forUser}/connections?personFields=emailAddresses,metadata`)
}

export function googlePeopleCreateContact(withEmailAddress) {
  const contact = {
    emailAddresses: [ { value: withEmailAddress } ],
    memberships: [ {
      contactGroupMembership: { contactGroupResourceName: "contactGroups/myContacts" }
    } ]
  }

  const url = _gconsts.GOOGLE_PEOPLE_API + `people:createContact`

  return axios.post(url,
    JSON.stringify(contact), { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )
}

// -- Google People - get a gmail account userId.
// -- NOTE: API call/definition to remain as defined
// -- while implementation may vary/improve over time.
export async function googlePeopleGetUserID(forEmail) {
  const contact = { emailAddresses: [ { value: forEmail } ] }

  const url = _gconsts.GOOGLE_PEOPLE_API + `people:createContact`

  const response = await axios.post(url,
    JSON.stringify(contact), { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
      "Content-Type": "application/json"
    } },
  )

  const data = await response.data

  let user   = { email: forEmail }

  for (const source of data.metadata.sources) {
    if (source.type === "PROFILE") {
      user.id = source.id
    }
  }

  return user
}

// -- helpers
function axiosCall(url) {
  let api_url =
    sessionStorage.getItem("loginProvider") === _constants.GOOGLE
      ? _gconsts.GOOGLE_CLASSROOM_API
      : _msconsts.REACT_APP_GRAPH_API_URL;

  console.log(api_url + url);

  return axios.get(api_url + url, {
    params: {},
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
    },
  });
}

function axiosGet(url, params = {}) {
  return axios.get(url, {
    params: params, headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
    },
  })
}

// Organisation Start

export async function saveOrganisation(formData) {
  return axios.post(`${process.env.SCHOOL_API_URL}/organization/create`,formData).then((res)=>{
            return res.data
         }).catch((err)=>{
           return err
         })
}

// Organisation End

// Teacher Start

export async function saveTeacher(formData) {
      return axios.post(`${process.env.SCHOOL_API_URL}/teacher/create/`,formData).then((res)=>{
            return {'success':res.data,'error':''}
         }).catch((err)=>{
          return {'error':err.response.data,'success':''}
          // console.log(err.response.data);
          // console.log(err.response.status);
         })
}

// Teacher End