const express = require("express");
const app = express();
const port = 3000;
const connection = require("../database/index.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

//to serve up static files:
app.use(express.static("dist"));

//use middlewares
app.use(bodyParser.json());
app.use(cookieParser());

//GET req to retrieve book list for user
app.get("/booklists/:username", (req, res) => {
  console.log("req.body here", req.body);
  connection.connection.query(
    `SELECT bookTitle, author, genre, notes FROM booklists WHERE userID IN (SELECT userID FROM users WHERE username = '${req.params.username}')`,
    (err, results) => {
      if (err) {
        console.log("Error in query to get all books", err);
        res.status(500);
      } else {
        console.log("Successfully retrieved all books");
        res.status(200).send(results);
      }
    }
  );
});

//POST req to add book to user's list
app.post("/booklists", (req, res) => {
  connection.connection.query(
    "insert into booklists (bookTitle, author, genre, notes) values (?, ?, ?, ?)",
    [
      req.body.bookTitle,
      req.body.author,
      req.body.author,
      req.body.genre,
      req.body.notes
    ],
    (err, results) => {
      if (err) {
        console.log("Error posting new book to list", err);
        res.status(500);
      } else {
        console.log("Successfully posted new book to user list");
        res.status(201);
      }
    }
  );
});

//POST req to add (register) new user to DB
app.post("/users", (req, res) => {
  connection.connection.query(
    "insert into users (username, firstName, lastName, password) values (?, ?, ?, ?)",
    [
      req.body.username,
      req.body.firstName,
      req.body.lastName,
      req.body.password
    ],
    (err, results) => {
      if (err) {
        console.log("Error posting new user to DB", err);
        res.status(500);
      } else {
        console.log("Successfully posted new user to DB");
        res.status(201);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
