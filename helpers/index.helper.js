import jwt from "jsonwebtoken";
import config from "../configuration/app.config.js";

const generateToken = (user) => {
    return jwt.sign(
      {
        iss: config.JWT_ISS,
        sub: user,
        iat: new Date().getTime(),
        exp: new Date().setDate(
          new Date().getDate() + Number(config.JWT_EXPIRY)
        ),
      },
      String(config.JWT_SECRET)
    );
  },
  verifyToken = (token) => {
    return jwt.verify(token, String(config.JWT_SECRET));
  },
  invalidEndpoint = (router) => {
    return router.use("*", function (req, res) {
      res.send({ status: false, message: "Invalid endpoint", data: null });
    });
  },
  helpers = {
    generateToken,
    verifyToken,
    invalidEndpoint,
  };

export default helpers;
