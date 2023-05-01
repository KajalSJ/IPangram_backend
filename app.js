import express, { json, urlencoded, static as expressStatic } from "express";
import logger from "morgan";
import cors from "cors";
import { createServer } from "http";
import userRouter from "./routes/user.route.js";
import departmentRouter from "./routes/department.route.js";

import connection from "./configuration/database.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { existsSync } from "fs";
import Ipan from "./helpers/message.helper.js";
import config from "./configuration/app.config.js";
import tedious from "tedious";
import fileUpload from "express-fileupload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = express(),
  attachCoreMiddlewares = async () => {
    checkEnv();
    app.use(logger("dev"));
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(expressStatic(Ipan.PATHS.PATH_FRONTEND));
    app.use(express.static(join(__dirname, "/public")));
    app.use(express.static(join(__dirname, "/public/graphs/boys")));
    app.use(express.static(join(__dirname, "/public/graphs/girls")));
    app.use(express.static(join(__dirname, "/public/patientDocuments")));
    app.use(express.static(join(__dirname, "/public/emailTemplates")));
    app.use(express.static(join(__dirname, "/public/notes")));
    app.use(fileUpload());
  },
  attachExternalMiddlewares = async () => {
    app.use(cors());
    app.use(
      session({
        secret: Ipan.APP_NAME,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
  },
  attachRouters = async () => { 
    app.use(Ipan.ROUTES.ROUTE_USER, userRouter);
    app.use(Ipan.ROUTES.ROUTE_DEPARTMENT, departmentRouter);

  },
  connectToDatabase = async () => {
    connection
      .authenticate()
      .then(async () => {
        console.log(Ipan.MESSAGES.CONNECTION_SUCCESS);
        await listenToServer();
      })
      .catch((err) => {
        console.log("err", err);
        console.error.bind(console, Ipan.MESSAGES.CONNECTION_ERR);
      });
  },
  checkEnv = () => {
    if (!existsSync(".env")) {
      console.log(Ipan.MESSAGES.ENV_NOT_FOUND_ERR);
      process.exit(1);
    }
  },
  listenToServer = async () => {
    const server = createServer(app);
    server.listen(Number(config.PORT));
    server.once("listening", () =>
      console.log(Ipan.MESSAGES.SERVER_STARTED.replace("PORT", config.PORT))
    );
    server.on("error", (error) => {
      throw error;
    });
  },
  applicationStack = {
    app,
    attachCoreMiddlewares,
    attachExternalMiddlewares,
    attachRouters,
    connectToDatabase,
  };

export default applicationStack;
