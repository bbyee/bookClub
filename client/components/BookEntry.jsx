import React from "react";
import UpdateBookForm from "./UpdateBookForm";

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
        <div>
          <h3>Title: {this.props.book.bookTitle}</h3>
          <p>Author: {this.props.book.author}</p>
          <p>Genre: {this.props.book.genre}</p>
          <p>Notes: {this.props.book.notes}</p>
        </div>
        <div>
          <UpdateBookForm
            currentTitle={this.props.book.bookTitle}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

export default BookEntry;
