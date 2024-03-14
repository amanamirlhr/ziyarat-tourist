const express = require("express");
const touristAmountRouter = express.Router();
const touristAmountController = require("../controllers/TouristAmountController");
const { authentication } = require("../middlewares/auth.middleware");

touristAmountRouter
  .route("/create")
  .post([authentication], touristAmountController.addTouristAmount);

touristAmountRouter
  .route("/update/:id")
  .put([authentication], touristAmountController.updateTouristAmount);

touristAmountRouter
  .route("/delete/:tourId/:touristId")
  .delete([authentication], touristAmountController.deleteTouristAmountEntry);

touristAmountRouter
  .route("/getTouristAmounts")
  .get([authentication], touristAmountController.getAllTouristAmount);

module.exports = {
  touristAmountRouter,
};
