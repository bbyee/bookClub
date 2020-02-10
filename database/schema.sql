/*  Execute this file from the command line by typing:
 *    mysql -u root < database/schema.sql
 *  to create the database and the tables.*/

DROP DATABASE  IF EXISTS bookClub;
CREATE DATABASE IF NOT EXISTS bookClub;

USE bookClub;

CREATE TABLE users (
  userID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(150) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  primary key (userID)
);

CREATE TABLE booklists (
  bookNumber INT NOT NULL AUTO_INCREMENT,
  bookTitle VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  notes VARCHAR(1000),
  userID int,
  primary key (bookNumber),
  foreign key (userId) REFERENCES users(userID)
);

