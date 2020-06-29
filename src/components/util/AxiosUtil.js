import axios from "axios";
import * as _constants from "./constants";
import * as _gconsts from "./gConsts";
import * as _msconsts from "./msConsts";

export function userProfile() {
  let api_url =
    sessionStorage.getItem("loginProvider") === _constants.GOOGLE
      ? _gconsts.REACT_APP_GOOGLE_USERINFO_API
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

export function loadGoogleSubjects() {
  return axiosCall("courses?courseStates=" + _gconsts.COURSE_STATUS);
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

function axiosCall(url) {
  let api_url =
    sessionStorage.getItem("loginProvider") === _constants.GOOGLE
      ? _gconsts.REACT_APP_GOOGLE_CLASSROOM_API
      : _msconsts.REACT_APP_GRAPH_API_URL;

  console.log(api_url);

  return axios.get(api_url + url, {
    params: {},
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
    },
  });
}
