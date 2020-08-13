//Constats for Google environment

//Application related constants
export const REACT_APP_GOOGLE_OAUTH_SCOPES =
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/drive";  

export const REACT_APP_GOOGLE_OAUTH_TUTOR_SCOPES = "https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.rosters";

export const GOOGLE_USERINFO_API  = "https://www.googleapis.com/userinfo/v2/";

export const GOOGLE_CLASSROOM_API = "https://classroom.googleapis.com/v1/";

export const GOOGLE_DRIVE_API        = "https://www.googleapis.com/drive/v3/"
export const GOOGLE_DRIVE_UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/"

//features/ functionality related constants
export const COURSE_ACTIVE = "ACTIVE";
export const COURSE_ARCHIVED = "ARCHIVED";

//Drive file types
export const driveFileTypes = {
  DRIVE_FORMS : 'Forms',
  DRIVE_DOCS : 'Docs',
  DRIVE_SLIDES : 'Presentation',
  DRIVE_SHEETS : 'Spreadsheets',
  DRIVE_DRAWINGS : 'Drawings',
}

//CourseWork Type Enums
export const courseWorkType = {
  //COURSE_WORK_TYPE_UNSPECIFIED: 
  ASSIGNMENT : 'Assignment',
  SHORT_ANSWER_QUESTION : 'Question',
  MULTIPLE_CHOICE_QUESTION : 'Quiz Assignment',
//   "Material",
//   "Reuse post",
}

export const roleType = {
  TEACHER: 'teachers',
  STUDENT: 'students',
  // TEACHER: {TEACHER: 'teachers'},
  // STUDENT: {STUDENT: 'students'},
}


