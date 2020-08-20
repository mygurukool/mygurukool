//Constats for Google environment

//Application related constants
export const REACT_APP_GOOGLE_OAUTH_SCOPES =
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/drive";  

export const REACT_APP_GOOGLE_OAUTH_TUTOR_SCOPES = "https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.rosters";

export const GOOGLE_USERINFO_API  = "https://www.googleapis.com/userinfo/v2/";

export const GOOGLE_CLASSROOM_API = "https://classroom.googleapis.com/v1/";

export const GOOGLE_DRIVE_API        = "https://www.googleapis.com/drive/v3/"
export const GOOGLE_DRIVE_UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/"

export const GOOGLE_PEOPLE_API = "https://people.googleapis.com/v1/"

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

//Add files types
export const addFileTypes = {
  FILE : 'File',
  YOU_TUBE : 'YouTube',
  LINK : 'Link',
  GOOGLE_DRVE: 'Google Drive',
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

export const courseWorkAction = {
  CREATE: 'Create',
  EDIT: 'Edit',
}

export const actionButtonText = {
  ADD: 'Add',
  CREATE: 'Create',
}

export const roleType = {
  TEACHER: 'teachers',
  STUDENT: 'students',
  // TEACHER: {TEACHER: 'teachers'},
  // STUDENT: {STUDENT: 'students'},
}


