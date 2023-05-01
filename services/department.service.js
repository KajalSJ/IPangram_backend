import departmentModel from "../models/department.model.js";
import commonHelper from "../helpers/common.helper.js";

const { createOne, retrieveOne, retrieveMany, deleteOne } =
  commonHelper;

const createDepartment = async (data) => {
    return await createOne(departmentModel, { ...data });
  },
  retrieveDepartmentDetailById = async (data) => {
    return await retrieveOne(departmentModel, { ...data });
  },
  retrieveDepartment = async (data) => {
    return await retrieveMany(departmentModel, { ...data });
  },
  deleteDepartment = async (data) => {
    return await deleteOne(departmentModel, { ...data });
  },
  departmentService = {
    createDepartment,
    retrieveDepartmentDetailById,
    retrieveDepartment,
    deleteDepartment,
  };

export default departmentService;
