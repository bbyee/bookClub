const mysql = require("mysql");

//Establish connection for mySQL database, please note I did not put a password here

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
