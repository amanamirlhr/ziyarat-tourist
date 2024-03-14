const express = require("express");
const tourRouter = express.Router();
const tourController = require("../controllers/TourController");
const { authentication } = require("../middlewares/auth.middleware");

tourRouter
  .route("/createTour")
  .post(tourController.createTour);

tourRouter
  .route("/updateTour/:id")
  .put([authentication], tourController.updateTour);

tourRouter
  .route("/deleteTour/:id")
  .delete([authentication], tourController.deleteTour);

tourRouter
  .route("/getTour/:id")
  .get([authentication], tourController.getByTourId);

tourRouter.route("/getTours").get(tourController.getTours);


module.exports = {
  tourRouter,
};
