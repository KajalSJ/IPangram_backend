import { Router } from "express";
import Ipan from "../helpers/message.helper.js";
import departmentDomain from "../domains/department.domain.js";
console.log(Ipan["ROUTES"]["DEPARTMENT_ENDOINTS"]["GET_ALL_DEPARMENT"]);

const departmentRouter = Router(),
  {
    addDepartment,
    getAllDepartment,
    getDepartmentEmployees
  } = departmentDomain;
  departmentRouter.get('/getAllDepartment', getAllDepartment);
  departmentRouter.post('/addDepartment', addDepartment);
  departmentRouter.post('/getDepartmentEmployees', getDepartmentEmployees);

export default departmentRouter;
