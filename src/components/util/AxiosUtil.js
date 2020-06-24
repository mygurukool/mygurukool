import axios from "axios";
import * as _constants from "./constants";

export function userProfile() {
  return axios.get(
    // "https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/1-9e7210a1-77c7-4b10-8a1b-ab0fb4a9f4dd/sectionGroups"
    process.env.REACT_APP_GRAPH_API_URL_BETA + "/me",
    {
      params: {},
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          _constants.ACCESS_TOKEN
        )}`,
      },
    }
  );
}

export function loadSite(groupName) {
  return axiosCall("sites/root:/sites/" + groupName);
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

export function loadAssignments(groupId, exerciseId) {
  return axiosCall(`sites/${groupId}/onenote/sections/${exerciseId}/pages`);
  // `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${this.state.sections.value[0].id}/pages`
}

export function loadAssignmentPage(pageUrl) {
  //replacing process.env.REACT_APP_GRAPH_API_URL as the url include
  return axiosCall(pageUrl.replace(process.env.REACT_APP_GRAPH_API_URL, ""));
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
    process.env.REACT_APP_GRAPH_API_URL +
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
  return axios.get(process.env.REACT_APP_GRAPH_API_URL + url, {
    params: {},
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        _constants.ACCESS_TOKEN
      )}`,
    },
  });
}
