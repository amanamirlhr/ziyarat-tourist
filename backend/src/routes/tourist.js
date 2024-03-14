const express = require("express");
const touristRouter = express.Router();
const touristController = require("../controllers/TouristController");
const { authentication } = require("../middlewares/auth.middleware");

touristRouter
  .route("/createTourist")
  .post([authentication], touristController.createTourist);

touristRouter
  .route("/updateTourist/:userId")
  .put([authentication], touristController.updateTourist);

touristRouter
  .route("/deleteTourist/:id")
  .delete([authentication], touristController.deleteTourist);

touristRouter
  .route("/getTourist/:id")
  .get([authentication], touristController.getByTouristId);

touristRouter
  .route("/getTourists")
  .get([authentication], touristController.getTourists);
touristRouter
  .route("/getTouriestName")
  .get(touristController.getTouriestName);

  module.exports = {
    touristRouter,
  };