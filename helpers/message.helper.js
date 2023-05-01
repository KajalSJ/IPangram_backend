const Ipan = {
  APP_NAME: "Ipan",
  MESSAGES: {
    CONNECTION_SUCCESS: "Connection to database established.",
    CONNECTION_ERR: "Error with database connection.",
    ENV_NOT_FOUND_ERR: "No .env found. Please add .env to app root",
    SERVER_STARTED: "Server listening at PORT.",
    DATA_UNAVL: "No data available.",
    USER_NOT_FOUND_ERR: "User not found.",
    JWT_INVD_ERR: "Unable to verify token.",
    JWT_EXPIRED_ERR: "Please generate new token. Unable to verify token.",
    NO_TOKEN_ERR: "No auth token found in header.",
    PASS_TOKEN_INVD_ERR: "Please pass token properly with Bearer <token>.",
    USER_INVD_PWD_ERR: "Invalid password. Please try with correct one.",
    LOGIN_SUCCESS: "Login successful.",
    USER_LOGOUT_SUCCESS: "User logout successfully.",
    EMAIL_EXISTS_ERR: "Email is already taken.",
    UPDATE_SUCCESS: "Updated successfully.",
    ADD_USER_SUCCESS: "Signup successfully.",
    JWT_EXPIRED_ERR: "Please generate new token. Unable to verify token.",
    UNAUTHORIZED_USER: "Your account is not verified by admin.",
    USER_LIST: "User list.",
    EMAIL_ALREADY_VERIFIED: "User email already verified.",
    EMAIL_NOT_VERIFIED: "User Email is not Verified.",
    USER_DETAILS: "User details.",
  },
  VALIDATIONS: {
    FIRST_NAME_REQ: "First Name is required field",
    FIRST_NAME_ALPHA: "First Name must be in alphabets only",
    LAST_NAME_REQ: "Last Name is required field",
    LAST_NAME_ALPHA: "Last Name must be in alphabets only",
    GENDER_REQ: "Gender is required field",
    EMAIL_REQ: "Email is required field",
    INVD_EMAIL: "Invalid email provided",
    PASSWORD_REQ: "Password is required field",
    FIRST_NAME_CHAR_LIMIT: "First name upto 15 character",
    LAST_NAME_CHAR_LIMIT: "Last name upto 15 character",
    MIDDLE_NAME_CHAR_LIMIT: "Middle Name upto 15 character",
    INVD_GENDER: "Invalid Gender",
  },
  PATHS: {
    PATH_PATIENT_DOCS: "public",
    PATH_VIEW: "views",
    PATH_IMAGES: "public/images",
    PATH_FRONTEND: "build",
  },
  ROUTES: {
    ROUTE_USER: "/user",
    USER_ENDPOINTS: {
      SIGN_UP: "/signup",
      SIGN_IN: "/signin",
      GET_ALL_EMPLOYEE: "/getAllEmployee",
      ASSIGN_DEPARTMENT: "/assignDepartmentToUser",
      UPDATE_USER_DETAIL: '/updateUserDetails'
    },
    ROUTE_DEPARTMENT: "/department",
    DEPARTMENT_ENDOINTS: {
      GET_ALL_DEPARMENT: "/getAllDepartment",
    }
  },
};

export default Ipan;
