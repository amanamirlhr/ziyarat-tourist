const { Op } = require("sequelize");
const db = require("../database/models");
const { Tourist } = require("../database/models");
const sql = require('mssql');


const config = {
  user: 'aman',
  password: 'amir',
  server: 'DESKTOP-HBFVMP3',
  database: 'management_development',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const getTouristsByMonth = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('EXEC GetUserCountByMonth');
    res.json(result.recordset);
    console.log("inner try bottom", result.recordset);
   
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({ error: 'An error occurred.' });
    console.log(err);
  } finally {
    sql.close();
  }
}
const getAllTourists = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT COUNT(*) AS total_Tourist FROM Tourists;');
    res.json(result.recordset);
    console.log("inner try bottom", result.recordset);
   
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({ error: 'An error occurred.' });
    console.log(err);
  } finally {
    sql.close();
  }
}
const getAllTour = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT COUNT(*) AS total_Tours FROM Tours;');
    res.json(result.recordset);
    console.log("inner try bottom", result.recordset);
   
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({ error: 'An error occurred.' });
    console.log(err);
  } finally {
    sql.close();
  }
}
const getAllCountry = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT COUNT(*) AS total_Country FROM Countries;');
    res.json(result.recordset);
    console.log("inner try bottom", result.recordset);
   
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({ error: 'An error occurred.' });
    console.log(err);
  } finally {
    sql.close();
  }
}

module.exports = {
  getTouristsByMonth,
  getAllTourists,
  getAllTour,
  getAllCountry,
  config,
};
