const { Op } = require("sequelize");
const db = require("../database/models");
const { Country } = require("../database/models");

getCountries = (req, res) => {
  Country.findAll()
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

module.exports = {
  getCountries,
};
