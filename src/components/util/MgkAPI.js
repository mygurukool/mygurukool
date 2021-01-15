import axios from "axios";

export function mgkCreateCourse(course) {
  const url = process.env.REACT_APP_MGK_API_URL + 'courses'
  return axiosPost(url, course)
}

export function mgkLoadSubjects(){
  return axiosGet(process.env.REACT_APP_MGK_API_URL + `courses`)
}

export function mgkLoadAssignments(courseId){
  return axiosGet(process.env.REACT_APP_MGK_API_URL + `assignments/courseId/${courseId}`)
}

export function createAssignment(courseId, coursework) {
  const url = process.env.REACT_APP_MGK_API_URL + `assignments/courseId/${courseId}`
  return axiosPost(url, coursework)
}

export function patchAssignment(assignmentId, coursework) {
  const url = process.env.REACT_APP_MGK_API_URL + `assignments/${assignmentId}` //`courses/${courseId}/courseWork/${coursework.id}?updateMask=${updateMask}`
  console.log('url ' +  url  + ' ...assignmentsId ' + assignmentId)
  return axiosPatch(url, coursework)
}

function axiosPatch(url, data) {
  return axios.patch(url,
    JSON.stringify(data), { headers: {
      // Authorization: `Bearer ${sessionStorage.getItem(
      //   _constants.ACCESS_TOKEN
      // )}`,
      "Content-Type": "application/json"
    } },
  ).then((response) => {
    console.log('axiosPatch: ' + JSON.stringify(response));
  }, (error) => {
    console.log('axiosPatch: ' + error);
  });
}

function axiosPost(url, data) {
  return axios.post(url,
    JSON.stringify(data), { headers: {
      // Authorization: `Bearer ${sessionStorage.getItem(
      //   _constants.ACCESS_TOKEN
      // )}`,
      "Content-Type": "application/json"
    } },
  )
  .then((response) => {
    //alert(JSON.stringify(response.data))
    console.log('axiosPost: ' + response);
  }, (error) => {
    console.log('axiosPost: ' + error);
  });
}

function axiosGet(url, params = {}) {
  return axios.get(url, {
    params: params, 
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem(
    //     _constants.ACCESS_TOKEN
    //   )}`,
    // },
  })
}
