const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "bookClub"
});

connection.connect(function(err) {
  if (err) {
    console.log("Error connecting to DB!");
  } else {
    console.log("Successfully connected to DB!");
  }
});

module.exports.connection = connection;
