const { Op } = require("sequelize");
const db = require("../database/models");
const { Currency, Tour, Country, Expense } = require("../database/models");

const addExpense = async (req, res) => {
  try {
    const expenseObj = {
      item: req.body.item,
      purchaseDate: req.body.purchaseDate,
      quantity: req.body.quantity,
      description: req.body.description,
      currencyId: req.body.currencyId,
      countryId: req.body.countryId,
      isActive: req.body.isActive,
      tourId: req.body.tourId,
    };

    const expense = await Expense.create(expenseObj);
    res.status(201).json({
      data: expense,
      message: "expense amount added successfully",
      status: "success",
    });
  } catch (error) {
    console.error("error saving:", error);
    res.status(500).json({
      data: null,
      message:
        "while creating expense the internal server error occuring i.e. " +
        error,
      status: "error",
    });
  }
};

const updateExpense = async (req, res) => {
  const id = req.params.id;

  const existingEntity = await Expense.findByPk(id);
  if (!existingEntity) {
    return res.status(404).json({ error: "record not found" });
  }

  const result = await Expense.update(
    {
      item: req.body.item,
      purchaseDate: req.body.purchaseDate,
      quantity: req.body.quantity,
      description: req.body.description,
      currencyId: req.body.currencyId,
      countryId: req.body.countryId,
      isActive: req.body.isActive,
      tourId: req.body.tourId,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.status(201).json({
    data: result,
    message: "record updated successfully",
    status: "success",
  });
};

const getAllExpense = async (req, res) => {
  let { tourId, currencyId, countryId, searchItem, pageSize, pageNumber } =
    req.query;
  pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 1;
  let offset = (pageNumber - 1) * pageSize;

  try {
    const whereCondition = {};
    if (req.query.currencyId) {
      whereCondition.currencyId = currencyId;
    }

    if (req.query.tourId) {
      whereCondition.tourId = tourId;
    }

    if (req.query.countryId) {
      whereCondition.countryId = countryId;
    }

    if (searchItem) {
      whereCondition.item = { [Op.like]: `%${searchItem}%` };
    }

    const totalExpenses = await Expense.count({
      where: whereCondition,
    });

    let expenses = await Expense.findAll({
      where: whereCondition,

      include: [
        {
          model: Tour,
          as: "tours",
        },
        {
          model: Country,
          as: "countries",
        },
        {
          model: Currency,
          as: "currencies",
        },
      ],

      limit: pageSize,
      offset: offset,
    });

    return res.status(200).json({
      data: expenses,
      message: "tour get successfully.",
      status: "success",
      paginated: {
        totalCount: totalExpenses,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
  } catch (error) {
    console.error("error getting tourist amount:", error);
    res.status(500).json({
      data: null,
      message: "internal server error i.e. " + error,
      status: "error",
    });
  }
};
module.exports = {
  addExpense,
  updateExpense,
};
