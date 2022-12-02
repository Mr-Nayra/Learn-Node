const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "hotel_database",
});

module.exports = pool.promise();
