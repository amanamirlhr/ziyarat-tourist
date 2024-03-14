const { validationResult } = require("express-validator");

const validator = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.path]: err.msg }));

  console.log(extractedErrors);
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validator,
};
