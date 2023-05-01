import responseHelper from "../helpers/response.helper.js";
import indexHelper from "../helpers/index.helper.js";
import Ipan from "../helpers/message.helper.js";

const { send401 } = responseHelper,
  { verifyToken: jwtVerify } = indexHelper,
  {
    MESSAGES: { NO_TOKEN_ERR, PASS_TOKEN_INVD_ERR },
  } = Ipan;

const verifyToken = (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        send401(res, { status: false, mesaage: NO_TOKEN_ERR, data: null });
      } else {
        const token = req.headers.authorization.split("Bearer ");
        req.user = jwtVerify(token[1]).sub;
        next();
      }
    } catch (error) {
      send401(res, { status: false, mesaage: PASS_TOKEN_INVD_ERR, data: null });
    }
  },
  jwtMiddleware = { verifyToken };

export default jwtMiddleware;