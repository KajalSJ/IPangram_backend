import validator from "../configuration/validation.config.js";
import Ipan from "../helpers/message.helper.js";

const { check, sanitizeBody } = validator,
  {
    VALIDATIONS: { EMAIL_REQ, INVD_EMAIL, PASSWORD_REQ },
  } = Ipan;

const email = check("email")
    .not()
    .isEmpty()
    .withMessage(EMAIL_REQ)
    .trim()
    .isEmail()
    .withMessage(INVD_EMAIL),
  password = check("password").not().isEmpty().withMessage(PASSWORD_REQ),
  // Sanitizers
  emailSanitizer = sanitizeBody("email").escape(),
  passwordSanitizer = sanitizeBody("password").escape(),
  authByEmailValidator = { email, password, emailSanitizer, passwordSanitizer };

export default authByEmailValidator;
