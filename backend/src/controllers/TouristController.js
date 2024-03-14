const { Op, Model } = require("sequelize");
const db = require("../database/models");
const development = require('../config/database');
const { Tourist, Country, User, Tour } = require("../database/models");

const createTourist = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      tourId,
      cnic,
      age,
      roleId,
    } = req.body;

    const userObj = {
      firstName,
      lastName,
      email,
      phone,
      address,
      roleId,
    };
    let touristObj = {
      ...userObj,
      tourId,
      cnic,
      age,
      name: firstName + " " + lastName,
    };

    const user = await User.create(userObj, { transaction });

    const touristPromise = await Tourist.create(
      { ...touristObj, userId: user.userId },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      data: touristPromise,
      message: "tourist created successfully",
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

const updateTourist = async (req, res) => {
  try {
    let request = await getTouristRequestObj(req);

    const userObj = request[0];
    const touristObj = request[1];
    let existingEntity = await User.findByPk(userObj.userId, {
      raw: true,
    });

    if (!existingEntity) {
      return res.status(404).json({ error: "user not found" });
    }

    let userUpdate = await User.update(
      {
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        phone: userObj.phone,
        address: userObj.address,
      },
      {
        where: {
          userId: userObj.userId,
        },
      }
    );

    let touristUpdate = await Tourist.update(
      {
        name: userObj.firstName + " " + userObj.lastName,
        email: userObj.email,
        cnic: userObj.cnic,
        age: userObj.age,
        phone: userObj.phone,
        address: userObj.address,
      },
      {
        where: {
          [Op.and]: [{ userId: userObj.userId }, { tourId: touristObj.tourId }],
        },
      }
    );

    console.log("existing user is: ", existingEntity);

    res.status(201).json({
      data: touristUpdate,
      message: "tourist updated successfully",
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

const getByTouristId = async (req, res) => {
  const touristDetails = await getTouristDetails(req.params.id);
  console.log(touristDetails);
  res.status(200).json({
    data: touristDetails,
    message: "tour get successfully.",
    status: "success",
  });
};

const getTourists = async (req, res) => {
  let { pageSize, pageNumber } = req.query;
  pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 1;
  let offset = (pageNumber - 1) * pageSize;

  const totalTourist = await Tourist.count({
    where: req.query.tourId ? { tourId: { [Op.eq]: req.query.tourId } } : {},
  });

  let tourists = await Tourist.findAll({
    include: [
      {
        model: Tour,
        as: "tours",
        include: [
          {
            model: Country,
            as: "countries_table",
          },
        ],
      },
    ],
    where: req.query.tourId ? { tourId: { [Op.eq]: req.query.tourId } } : {},

    limit: pageSize,
    offset: offset,
  });
  return res.status(200).json({
    data: tourists,
    message: "tourists get successfully.",
    status: "success",
    paginated: {
      totalCount: totalTourist,
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
  });
};

const deleteTourist = async (req, res) => {
  try {
    let existingTourist = await Tourist.findOne({
      raw: true,
      where: {
        userId: req.params.id,
      },
    });
    if (!existingTourist) {
      return res.status(404).json({
        data: null,
        message: "no results found for the given query",
        status: "error",
      });
    }
    let result = await Tourist.destroy({
      where: {
        touristId: req.params.id,
      },
    });

    res.status(200).json({
      data: result,
      message: "tourist deleted successfully.",
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

const getTouristDetails = async (touristId) => {
  const tourist = await Tourist.findByPk(parseInt(touristId), {
    raw: true,
    include: [
      {
        model: Tour,
        as: "tours",
      },
    ],
  });
  return tourist;
};

const getTouristRequestObj = async (req) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, phone, address, tourId, cnic, age } =
    req.body;
  const userObj = {
    firstName,
    lastName,
    email,
    phone,
    address,
    userId,
  };
  const touristObj = {
    ...userObj,
    tourId,
    cnic,
    age,
  };

  let response = [];
  response.push(userObj);
  response.push(touristObj);
  return response;
};

getTouriestName = (req, res) => {
  Tourist.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Student."
      });
    });
};
function getTouristsByMonth() {
  async (req, res) => {
    try {
      console.log("inner try top");
      // const touriest = await db.sequelize.transaction();
      await sql.connect("development");
      const result = await sql.query('EXEC GetTouriestCountByMonth');
      res.json(result.recordset);
      console.log("inner try bottom");
    } catch (err) {
      console.log(err);
      console.error(err);
      res.status(500).json({ error: 'An error occurred.' });
      console.log(err);
    }
  };
}
// getTouriestCreatedAt = (req, res) => {

//   Tourist.findAll()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Student."
//       });
//     });
// };

module.exports = {
  createTourist,
  updateTourist,
  getTourists,
  getByTouristId,
  deleteTourist,
  getTouriestName,
  // getTouriestCreatedAt,
  getTouristsByMonth,
};
