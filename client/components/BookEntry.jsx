import React from "react";

class BookEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };

    //bind methods here:
  }

  render() {
    return (
      <div>
        <h3>Title: {this.props.book.bookTitle}</h3>
        <p>Author: {this.props.book.author}</p>
        <p>Genre: {this.props.book.genre}</p>
        <p>Notes: {this.props.book.notes}</p>
      </div>
    );
  }
}

export default BookEntry;
