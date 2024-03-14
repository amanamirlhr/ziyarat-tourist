const { Op } = require("sequelize");
const db = require("../database/models");
const {
  Tourist,
  Currency,
  TouristAmount,
  Tour,
} = require("../database/models");

const addTouristAmount = async (req, res) => {
  try {
    let { tourId, currencyId, receivedAmount, touristId } = req.body;

    const touristAmountObj = {
      tourId,
      currencyId,
      receivedAmount,
      touristId,
    };

    const touristAmount = await TouristAmount.create(touristAmountObj);
    res.status(201).json({
      data: touristAmount,
      message: "tourist amount added successfully",
      status: "success",
    });
  } catch (error) {
    console.error("error saving:", error);
    res.status(500).json({
      data: null,
      message: "internal server error i.e. " + error,
      status: "error",
    });
  }
};

const updateTouristAmount = async (req, res) => {
  const id = req.params.id;
  let { tourId, currencyId, receivedAmount, touristId } = req.body;

  const existingEntity = await TouristAmount.findByPk(id);
  if (!existingEntity) {
    return res.status(404).json({ error: "record not found" });
  }

  const result = await TouristAmount.update(
    {
      tourId: tourId,
      currencyId: currencyId,
      receivedAmount: receivedAmount,
      touristId: touristId,
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

const getAllTouristAmount = async (req, res) => {
  let { tourId, touristId, pageSize, pageNumber } = req.query;
  pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 1;
  let offset = (pageNumber - 1) * pageSize;

  try {
    const whereCondition = {};
    if (req.query.touristId) {
      whereCondition.touristId = touristId;
      if (req.query.tourId) {
        whereCondition.tourId = tourId;
      }
    } else {
      whereCondition.tourId = tourId;
    }

    const totalTouristAmount = await TouristAmount.count({
      where: whereCondition,
    });

    let touristAmounts = await TouristAmount.findAll({
      where: whereCondition,

      include: [
        {
          model: Tour,
          as: "tours",
        },
      ],

      limit: pageSize,
      offset: offset,
    });

    return res.status(200).json({
      data: touristAmounts,
      message: "tour get successfully.",
      status: "success",
      paginated: {
        totalCount: totalTouristAmount,
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

const deleteTouristAmountEntry = async (req, res) => {
  try {
    let { tourId, touristId } = req.params;
    let existingTouristAmount = await TouristAmount.findOne({
      raw: true,
      where: {
        [Op.and]: [{ tourId: tourId }, { touristId: touristId }],
      },
    });
    if (!existingTouristAmount) {
      return res.status(404).json({
        data: null,
        message: "no results found for the given query",
        status: "error",
      });
    }
    let result = await TouristAmount.destroy({
      where: {
        [Op.and]: [{ tourId: tourId }, { touristId: touristId }],
      },
    });

    res.status(200).json({
      data: result,
      message: "touristAmount record deleted successfully.",
      status: "success",
    });
  } catch (error) {
    console.error("error while deleting entity:", error);
    res.status(500).json({
      data: null,
      message: "something went wrong: " + error.message,
      status: "error",
    });
  }
};
module.exports = {
  addTouristAmount,
  updateTouristAmount,
  getAllTouristAmount,
  deleteTouristAmountEntry,
};
