const express = require("express");
const app = express();
const port = 3000;
const connection = require("../database/index.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

//to serve up static files:
app.use(express.static("dist"));

//use middlewares:
app.use(bodyParser.json());
app.use(cookieParser());

//GET req to retrieve book list for user
app.get("/booklists/:username", (req, res) => {
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
app.post("/booklists/:username", (req, res) => {
  connection.connection.query(
    `INSERT INTO booklists (bookTitle, author, genre, notes, userID) VALUES ('${req.body.addBookTitle}', '${req.body.addBookAuthor}', '${req.body.addBookGenre}', '${req.body.addBookNotes}', (select userID from users where username='${req.params.username}'))`,
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

//PUT req to update title
app.put("/bookTitle", (req, res) => {
  connection.connection.query(
    `UPDATE booklists SET bookTitle='${req.body.updatedTitle}' WHERE bookTitle='${req.body.currentTitle}'`,
    (err, results) => {
      if (err) {
        console.log("Error in app.put", err);
        res.status(500);
      } else {
        console.log("Success in app.put");
        res.status(201);
      }
    }
  );
});

//PUT req to update author
app.put("/bookAuthor", (req, res) => {
  connection.connection.query(
    `UPDATE booklists SET author='${req.body.updatedAuthor}' WHERE author='${req.body.currentAuthor}'`,
    (err, results) => {
      if (err) {
        console.log("Error in updating author", err);
        res.status(500);
      } else {
        console.log("Successfully updated author");
        res.status(201);
      }
    }
  );
});

//PUT req to update genre
app.put("/bookGenre", (req, res) => {
  connection.connection.query(
    `UPDATE booklists SET genre='${req.body.updatedGenre}' WHERE genre='${req.body.currentGenre}'`,
    (err, results) => {
      if (err) {
        console.log("Error in updating genre", err);
        res.status(500);
      } else {
        console.log("Successfully updated genre");
        res.status(201);
      }
    }
  );
});

//PUT req to update notes
app.put("/bookNotes", (req, res) => {
  connection.connection.query(
    `UPDATE booklists SET notes='${req.body.updatedNotes}' WHERE notes='${req.body.currentNotes}'`,
    (err, results) => {
      if (err) {
        console.log("Error in updating notes", err);
        res.status(500);
      } else {
        console.log("Successfully updated notes");
        res.status(201);
      }
    }
  );
});

//DELETE req to delete book
app.delete("/booklists/:bookTitle", (req, res) => {
  connection.connection.query(
    `DELETE FROM booklists WHERE bookTitle='${req.params.bookTitle}'`,
    (err, results) => {
      if (err) {
        console.log("Error deleting book", err);
        res.status(500);
      } else {
        console.log("Successfully deleted book");
        res.status(200);
      }
    }
  );
});

//POST req to add (register) new user to DB
app.post("/users", (req, res) => {
  connection.connection.query(
    "INSERT INTO users (username, firstName, lastName, password) VALUES (?, ?, ?, ?)",
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
