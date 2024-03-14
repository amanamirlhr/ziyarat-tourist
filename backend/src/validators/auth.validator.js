const { check, validationResult } = require("express-validator");

const authValidationRules = () => {
  return [
    check("email")
      .notEmpty()
      .withMessage("email is required for this end-point")
      .bail()
      .isEmail()
      .withMessage("must be a valid e-mail address"),
    check("password")
      .notEmpty()
      .withMessage("password is required for this end-point"),
  ];
};

// const validator = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }
//   console.log(errors.array());
//   const extractedErrors = errors
//     .array()
//     .map((err) => ({ [err.path]: err.msg }));

//   console.log(extractedErrors);
//   return res.status(422).json({
//     errors: extractedErrors,
//   });
// };

module.exports = {
  authValidationRules,
};
