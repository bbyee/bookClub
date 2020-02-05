import React from "react";
import UpdateTitleForm from "./UpdateTitleForm";

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
          <h3>
            Title: {this.props.book.bookTitle}{" "}
            <UpdateTitleForm
              currentTitle={this.props.book.bookTitle}
              user={this.props.user}
            />
          </h3>

          <p>Author: {this.props.book.author}</p>
          <p>Genre: {this.props.book.genre}</p>
          <p>Notes: {this.props.book.notes}</p>
        </div>
        <div></div>
      </div>
    );
  }
}

export default BookEntry;
