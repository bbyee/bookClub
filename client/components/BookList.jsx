import React from "react";
import BookEntry from "./BookEntry";

//Component responsible for taking the array of books per user and mapping it into an individual entry

const BookList = props => {
  console.log("props here", props);

  return (
    <div>
      {props.books.map(book => {
        return (
          <BookEntry getBooks={props.getBooks} user={props.user} book={book} />
        );
      })}
    </div>
  );
};

export default BookList;
