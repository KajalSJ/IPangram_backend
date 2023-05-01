import Ipan from "../helpers/message.helper.js";
import responseHelper from "../helpers/response.helper.js";
import helpers from "../helpers/index.helper.js";
import userService from "../services/user.services.js";
import authByEmailValidator from "../validators/auth.email.validator.js";
import validator from "../configuration/validation.config.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import bcrypt from "bcrypt";
import db from "../configuration/database.config.js";
import { readFileSync } from "fs";
import { Op } from "sequelize";
import Handlebars from "handlebars";
import lodash from "lodash";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();

const {
  MESSAGES: {
    VLD_ERR,
    USER_NOT_FOUND_ERR,
    USER_INVD_PWD_ERR,
    LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    EMAIL_EXISTS_ERR,
    ADD_USER_SUCCESS,
    SENT_OTP_SUCCESS,
    USER_VERIFY_SUCCESS,
    INVALID_OTP,
    UPDATE_PASSWORD_SUCCESS,
    JWT_EXPIRED_ERR,
    UNAUTHORIZED_USER,
    USER_LIST,
    EMAIL_ALREADY_VERIFIED,
    USER_DETAILS,
    DOCTOR_LIST,
    USER_UPDATE_SUCCESS,
    HOSPITAL_UNAUTHORIZED,
    EMAIL_NOT_VERIFIED,
  },
} = Ipan,
  { generateToken } = helpers,
  { send200, send500, send400, send401, send403, send404 } = responseHelper,
  { validationThrowsError } = validator,
  { verifyToken: jwtAuthGuard } = jwtMiddleware,
  {
    createUser,
    retrieveUserDetailById,
    updateUser,
    retrieveUser,
    countUser,
    deleteUser,
  } = userService

const addUser = [
  async (req, res) => {
    try {
      let user = await retrieveUserDetailById({
        where: { email: req.body.email },
      });
      console.log(user);
      if (user && user.length > 0) {
        send403(res, {
          status: false,
          message: EMAIL_EXISTS_ERR,
          data: null,
        });
      } else {
        let ap = await bcrypt.hash(
          req.body.password,
          await bcrypt.genSalt(10)
        )
        console.log(ap, req.body);
        let userDetail = await createUser({
          ...req.body,
          password: await bcrypt.hash(
            req.body.password,
            await bcrypt.genSalt(10)
          ),
        });
        if (userDetail)
          send200(res, {
            status: true,
            message: ADD_USER_SUCCESS,
            data: null,
          });
        else send500(res, {
          status: false,
          message: 'error',
        });
      }
    } catch (error) {
      send500(res, {
        status: false,
        message: error,
      });
    }
  },
],
  authByEmail = [
    authByEmailValidator.email,
    authByEmailValidator.password,
    authByEmailValidator.emailSanitizer,
    authByEmailValidator.passwordSanitizer,
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        try {
          const { email, password } = req.body;
          let user = await retrieveUserDetailById({ where: { email: email } });
          if (!user) {
            send500(res, {
              status: false,
              message: USER_NOT_FOUND_ERR,
              data: null,
            });
          } else {
            console.log(user[0].dataValues);
            if (!(await bcrypt.compare(password, user[0].dataValues.password)))
              send401(res, {
                status: false,
                message: USER_INVD_PWD_ERR,
                data: null,
              });
            else {

              user[0].dataValues.loginToken = undefined;
              user[0].dataValues.isLoggedIn = false;
              let token = generateToken(user[0].dataValues);
              await updateUser(
                {
                  loginToken: token,
                  isLoggedIn: true,
                },
                { where: { userId: user[0].dataValues.userId } }
              );
              let userDetail = await retrieveUserDetailById({
                where: { userId: user[0].dataValues.userId },
              });
              send200(res, {
                status: true,
                message: LOGIN_SUCCESS,
                data: { userDetail: userDetail },
              });
            }
          }
        } catch (error) {
          console.log(error);
          send500(res, {
            status: false,
            message: error,
          });
        }
      }
    },
  ],
  logoutUser = [
    jwtAuthGuard,
    async (req, res) => {
      try {
        const { user } = req;
        await updateUser(
          { loginToken: null, isLoggedIn: false },
          { where: { userId: user.userId } }
        );
        send200(res, {
          status: true,
          message: USER_LOGOUT_SUCCESS,
          data: null,
        });
      } catch (error) {
        send500(res, {
          status: false,
          message: error,
        });
      }
    },
  ],
  getAllEmployee = [
    // jwtAuthGuard,
    async (req, res) => {
      try {
        const {
          user,
          body: { department },
        } = req;
        let filterObj = {};
        if (department) {
          filterObj.department = department;
          filterObj.role = 'employee';
        } else {
          filterObj.role = 'employee';
        }
        let userList = await retrieveUser({
          where: filterObj,
          order: [["userId", "DESC"]],
          attributes: [
            "userId",
            "firstName",
            "email",
            "role",
            "categoryName",
            "location",
            "salary",
            "department"
          ],
        })

        send200(res, {
          status: true,
          message: USER_LIST,
          data: userList,
        });
      } catch (error) {
        send500(res, {
          status: false,
          message: error,
        });
      }
    },
  ],
  getUserDetailByToken = [
    jwtAuthGuard,
    async (req, res) => {
      try {
        const { user } = req;
        let userDetail = await retrieveUserDetailById({
          where: { userId: user.userId },
        });
        send200(res, {
          status: true,
          message: USER_DETAILS,
          data: { user: userDetail },
        });
      } catch (error) {
        send500(res, {
          status: false,
          message: error,
        });
      }
    },
  ],
  updateUserDetails = [
    async (req, res) => {
      try {
        const {
          body: {
            userId,
            department,
            categoryName,
            salary
          },
        } = req;
        console.log(userId);
        let userDetail = await retrieveUserDetailById({
          where: { userId: userId },
          attributes: ["userId"],
        });
        if (!userDetail) {
          send404(res, {
            status: false,
            message: "User not found",
            data: null,
          });
        } else {
          console.log(userDetail, 'userDetail');
          let updateObj = {};
          if (department) updateObj.department = department;
          if (categoryName) updateObj.categoryName = categoryName;
          if (salary) updateObj.salary = salary;
          await updateUser(updateObj, {
            where: { userId: userId },
          });
          send200(res, {
            status: true,
            message: USER_UPDATE_SUCCESS,
            data: null,
          });
        }
      } catch (error) {
        console.log(error);
        send500(res, {
          status: false,
          message: error,
        });
      }
    },
  ],
  assignDepartmentToUser = [
    async (req, res) => {
      try {
        const {
          body: {
            userId,
            categoryName,
            location,
            salary,
            departmentId
          },
        } = req;
        let userDetail = await retrieveUserDetailById({
          where: { userId: userId },
          attributes: ["userId"],
        });
        if (!userDetail) {
          send404(res, {
            status: false,
            message: "User not found",
            data: null,
          });
        } else {
          let updateObj = {};
          if (categoryName) updateObj.categoryName = categoryName;
          if (location) updateObj.location = location;
          if (salary) updateObj.salary = salary;
          if (departmentId) updateObj.department = departmentId;

          await updateUser(updateObj, {
            where: { userId: userId },
          });

          send200(res, {
            status: true,
            message: USER_UPDATE_SUCCESS,
            data: null,
          });
        }
      } catch (error) {
        send500(res, {
          status: false,
          message: error,
        });
      }
    },
  ],
  userDomain = {
    addUser,
    authByEmail,
    logoutUser,
    getAllEmployee,
    getUserDetailByToken,
    updateUserDetails,
    assignDepartmentToUser
  };

export default userDomain;
