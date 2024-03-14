const db = require("../database/models");
const { Tour } = require("../database/models");
const { TourCountry, TourCountries, Country } = require("../database/models");

const createTour = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { title, description, startDate, endDate } = req.body;
    const tourObj = {
      title,
      description,
      startDate,
      endDate,
      // CreatedById: req.user.userId,
    };

    const tour = await Tour.create(tourObj, { transaction });

    const tourCountries = req.body.tourCountries || [];
    const tourCountryPromises = tourCountries.map((tourCountry) =>
      TourCountry.create(
        { ...tourCountry, tourId: tour.tourId },
        { transaction }
      )
    );

    await Promise.all(tourCountryPromises);
    await transaction.commit();

    res.status(201).json({
      data: tour,
      message: "tour created successfully",
      status: "success",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("error saving parent and children:", error);
    res.status(500).json({
      data: null,
      message: "internal server error i.e. " + error,
      status: "error",
    });
  }
};

const updateTour = async (req, res) => {
  try {
    let tourObj = await getTourRequestObj(req);
    tourObj = { ...tourObj, tourId: req.params.id };
    let existingTour = await Tour.findOne({
      raw: true,
      where: {
        tourId: tourObj.tourId,
      },
      include: TourCountries,
    });

    if (!existingTour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    let resultUpdate = await Tour.update(
      {
        title: tourObj.title,
        description: tourObj.description,
        startDate: tourObj.startDate,
        endDate: tourObj.endDate,
        CreatedById: req.user.userId,
      },
      {
        where: {
          tourId: tourObj.tourId,
        },
      }
    );

    let esixtingTourCountries = await TourCountry.findAll({
      raw: true,
      where: {
        tourId: existingTour.tourId,
      },
    });

    if (esixtingTourCountries && tourObj.tourCountries) {
      await TourCountry.destroy({
        where: {
          tourId: tourObj.tourId,
        },
      });

      tourObj.tourCountries.map((tourCountry) =>
        TourCountry.create({ ...tourCountry, tourId: tourObj.tourId })
      );
    }

    console.log("the put request object is here: ", tourObj);
    console.log("existing tour is: ", existingTour);
    console.log("existing tour countries are: ", esixtingTourCountries);
    console.log("the update result is: ", resultUpdate);

    res.status(201).json({
      data: resultUpdate,
      message: "tour updated successfully",
      status: "success",
    });
  } catch (error) {
    console.error("something went wrong with this error: ", error);
    res.status(500).json({
      data: null,
      message: "internal server error i.e. " + error,
      status: "error",
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    let existingTour = await Tour.findOne({
      raw: true,
      where: {
        tourId: req.params.id,
      },
    });
    if (!existingTour) {
      return res.status(404).json({
        data: null,
        message: "no results found for the given query",
        status: "error",
      });
    }
    let result = await Tour.destroy({
      where: {
        tourId: req.params.id,
      },
    });

    res.status(200).json({
      data: result,
      message: "tour deleted successfully.",
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

const getByTourId = async (req, res) => {
  const tourWithCountries = await getTourByIdWithCountries(req.params.id);
  console.log(tourWithCountries);
  res.status(200).json({
    data: tourWithCountries,
    message: "tour get successfully.",
    status: "success",
  });
};

const getTours = async (req, res) => {
  let { pageSize, pageNumber } = req.query;
  pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 1;
  let offset = (pageNumber - 1) * pageSize;

  const totalTours = await Tour.count();

  let tours = await Tour.findAll({
    limit: pageSize,
    offset: offset,
  });
  return res.status(200).json({
    data: tours,
    message: "tour get successfully.",
    status: "success",
    paginated: {
      totalCount: totalTours,
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
  });
};

const getTourRequestObj = async (req) => {
  const { title, description, startDate, endDate, tourCountries } = req.body;
  let tourObj = {
    title,
    description,
    startDate,
    endDate,
    createdById: req.user.userId,
    tourCountries,
  };

  return tourObj;
};

const getTourByIdWithCountries = async (tourId) => {
  const tour = await Tour.findByPk(parseInt(tourId), {
    include: [
      {
        model: Country,
        as: "countries_table",
      },
    ],
  });

  return tour;
};

module.exports = {
  createTour,
  updateTour,
  deleteTour,
  getTours,
  getByTourId,
};
