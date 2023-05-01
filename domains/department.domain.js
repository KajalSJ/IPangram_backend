import Ipan from "../helpers/message.helper.js";
import responseHelper from "../helpers/response.helper.js";
import helpers from "../helpers/index.helper.js";
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
import departmentService from "../services/department.service.js";
import userService from "../services/user.services.js";
dotenv.config();

const {
    MESSAGES: {
        EMAIL_EXISTS_ERR,
        ADD_USER_SUCCESS,
        USER_LIST,
        USER_DETAILS
    },
} = Ipan,
    { send200, send500, send400, send401, send403, send404 } = responseHelper,
    { validationThrowsError } = validator,
    { verifyToken: jwtAuthGuard } = jwtMiddleware,
    {
        createDepartment,
        retrieveDepartmentDetailById,
        retrieveDepartment,
    } = departmentService,
    {
        createUser,
        retrieveUserDetailById,
        updateUser,
        retrieveUser,
        countUser,
        deleteUser,
      } = userService

const addDepartment = [
    async (req, res) => {
        try {
            let department = await retrieveDepartmentDetailById({
                where: { departmentName: req.body.departmentName },
            });
            if (department !== null) {
                send403(res, {
                    status: false,
                    message: EMAIL_EXISTS_ERR,
                    data: null,
                });
            } else {
                console.log(req.body);
                let departmentDetail = await createDepartment({
                    ...req.body,
                });
                if (departmentDetail)
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
    getAllDepartment = [
        // jwtAuthGuard,
        async (req, res) => {
            try {
                const {
                    body: { department },
                } = req;
                let departmentList = await retrieveDepartment({
                    where: {},
                    order: [["departmentId", "DESC"]],
                    attributes: [
                        "departmentId",
                        "departmentName"
                    ],
                })

                send200(res, {
                    status: true,
                    message: USER_LIST,
                    data: departmentList,
                });
            } catch (error) {
                send500(res, {
                    status: false,
                    message: error,
                });
            }
        },
    ],
    getDepartmentEmployees = [
        // jwtAuthGuard,
        async (req, res) => {
            try {
                const { department } = req.body;
                console.log(department, 'department');
                let departmentDetail = await retrieveUserDetailById({
                    where: { department: department },
                    attributes: ["userId", "firstName"],
                });
                send200(res, {
                    status: true,
                    message: USER_DETAILS,
                    data: { userList: departmentDetail },
                });
            } catch (error) {
                console.log(error);
                send500(res, {
                    status: false,
                    message: error,
                });
            }
        },
    ],
    departmentDomain = {
        addDepartment,
        getAllDepartment,
        getDepartmentEmployees,
    };

export default departmentDomain;
