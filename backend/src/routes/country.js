const express = require("express");
const countryRouter = express.Router();
const countriesController = require("../controllers/ContriesController");

countryRouter
    .route("/getCountries")
    .get(countriesController.getCountries);

module.exports = {
    countryRouter,
};