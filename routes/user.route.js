import { Router } from "express";
import userDomain from "../domains/user.domain.js";
import Ipan from "../helpers/message.helper.js";

const userRouter = Router(),
  {
    addUser,
    authByEmail,
    getAllEmployee,
    assignDepartmentToUser,
    updateUserDetails,
    logoutUser,
    getUserDetailByToken
  } = userDomain,
  {
    ROUTES: {
      USER_ENDPOINTS: {
        SIGN_UP,
        SIGN_IN,
        GET_ALL_EMPLOYEE,
        ASSIGN_DEPARTMENT,
        UPDATE_USER_DETAIL
      },
    },
  } = Ipan;

userRouter.post(SIGN_UP, addUser);
userRouter.post(SIGN_IN, authByEmail);
userRouter.post(GET_ALL_EMPLOYEE, getAllEmployee);
userRouter.post(ASSIGN_DEPARTMENT, assignDepartmentToUser)
userRouter.post(UPDATE_USER_DETAIL, updateUserDetails)
userRouter.post('/logout', logoutUser)
userRouter.get('/getUserDetailByToken', getUserDetailByToken)
export default userRouter;
