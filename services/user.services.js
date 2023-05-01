import userModel from "../models/user.model.js";
import commonHelper from "../helpers/common.helper.js";

const { createOne, retrieveOne, updateOne, retrieveMany, count, deleteOne } =
  commonHelper;

const createUser = async (data) => {
    return await createOne(userModel, { ...data });
  },
  retrieveUserDetailById = async (data) => {
    return await retrieveMany(userModel, { ...data });
  },
  updateUser = async (data, filter) => {
    return await updateOne(userModel, { ...data }, { ...filter });
  },
  retrieveUser = async (data) => {
    return await retrieveMany(userModel, { ...data });
  },
  countUser = async (data) => {
    return await count(userModel, { ...data });
  },
  deleteUser = async (data) => {
    return await deleteOne(userModel, { ...data });
  },
  userService = {
    createUser,
    retrieveUserDetailById,
    updateUser,
    retrieveUser,
    countUser,
    deleteUser,
  };

export default userService;
