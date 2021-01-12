import axios from "axios";

export function mgkCreateCourse(course) {
  console.log(process.env.REACT_APP_MGK_API_URL)
  const url = process.env.REACT_APP_MGK_API_URL+ 'courses'
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
