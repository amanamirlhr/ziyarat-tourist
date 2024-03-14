const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../controllers/ExpenseController");
const { authentication } = require("../middlewares/auth.middleware");

module.exports = {
  expenseRouter,
};

expenseRouter
  .route("/create")
  .post([authentication], expenseController.addExpense);

expenseRouter
  .route("/update/:id")
  .put([authentication], expenseController.updateExpense);
