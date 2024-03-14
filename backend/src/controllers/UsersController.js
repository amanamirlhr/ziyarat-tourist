const { Op } = require("sequelize");
const db = require("../database/models");
const { User } = require("../database/models");

getUsers = (req, res) => {
    User.findAll()
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
  getUsers,
};
