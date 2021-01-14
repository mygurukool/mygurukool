import axios from "axios";

export function mgkCreateCourse(course) {
  const url = process.env.REACT_APP_MGK_API_URL + 'courses'
  return axios.post(url,
    JSON.stringify(course), { headers: {
      // Authorization: `Bearer ${sessionStorage.getItem(
      //   _constants.ACCESS_TOKEN
      // )}`,

    // 'Access-Control-Allow-Origin': '*', 
       "Content-Type": "application/json"
    } },
  )
  .then((response) => {
    alert(JSON.stringify(response.data))
    console.log('mgkCreateCourse: ' + response);
  }, (error) => {
    console.log('mgkCreateCourse: ' + error);
  });
}

export function mgkLoadSubjects(courseId){
  return axiosGet(process.env.REACT_APP_MGK_API_URL + `courses`)
}

export function mgkLoadAssignments(courseId){
  return axiosGet(process.env.REACT_APP_MGK_API_URL + `assignments/courseId/${courseId}`)
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
