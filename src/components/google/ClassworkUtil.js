import * as _apiUtils from "../util/AxiosUtil";
/**
 * Check for AssociatedWithDeveloper flag on Assignments.
 * if "true" do nothing, the courseWork is owned by School App
 * else copy and re-create the course with School App.
 */
function associatedWithDeveloperCheck(assignments) {
    assignments && assignments.map((assignment) => {
      if (assignment && !assignment.hasOwnProperty("associatedWithDeveloper")) {
          //TODO: Create the Course first and the CourseWork
        _apiUtils
          .googleClassroomCreateCourseWork(assignment)
          .then((response) => {
            console.log(response);
          });
      }
    });
}

export function loadAssignments(courseId, associatedWithDeveloperCheck){
      return new Promise((resolve, reject) => {
        _apiUtils.loadGoogleAssignments(courseId)
        .then((response) => {
            console.log("ClassworkUtil.loadAssignment: " + JSON.stringify(response.data))
            let assignments = response.data.courseWork;
            if(associatedWithDeveloperCheck) associatedWithDeveloperCheck(assignments);
            resolve(assignments)
        })
        .catch((error) => {reject(error); console.log("ClassworkUtil.loadAssignment: " + error)});
      })
}

