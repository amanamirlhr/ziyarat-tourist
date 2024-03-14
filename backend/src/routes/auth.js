const express = require("express");
const authRouter = express.Router();
const { validator } = require("../middlewares/requestValidator.middleware");
const { authValidationRules } = require("../validators/auth.validator");
const authController = require("../controllers/AuthController");

authRouter
  .route("/login")
  .post(authValidationRules(), validator, authController.login);

module.exports = {
  authRouter,
};
