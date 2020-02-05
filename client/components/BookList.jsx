import React from "react";
import BookEntry from "./BookEntry";

const BookList = props => {
  // console.log("props here", props);

  return (
    <div>
      {props.books.map(book => {
        return <BookEntry book={book} />;
      })}
    </div>
  );
};

export default BookList;
