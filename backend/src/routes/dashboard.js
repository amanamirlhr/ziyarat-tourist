const DashboardGraphController = require("../controllers/DashboardGraphController")
const express = require("express");
const dashboardRouter = express.Router();

dashboardRouter
  .route("/getTouriestByMonth")
  .get(DashboardGraphController.getTouristsByMonth);
dashboardRouter
  .route("/getAllTourist")
  .get(DashboardGraphController.getAllTourists);
dashboardRouter
  .route("/getAllTour")
  .get(DashboardGraphController.getAllTour);
  dashboardRouter
  .route("/getAllCountry")
  .get(DashboardGraphController.getAllCountry);

module.exports = {
  dashboardRouter,
};