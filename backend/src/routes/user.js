const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UsersController");

userRouter
    .route("/getUsers")
    .get(userController.getUsers);

module.exports = {
    userRouter,
};