import React from "react";
import UpdateTitleForm from "./UpdateTitleForm";
import UpdateAuthorForm from "./UpdateAuthorForm";

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
          <div>
            <p>Author: {this.props.book.author}</p>
            <UpdateAuthorForm currentAuthor={this.props.book.author} />
          </div>
          <div>
            <p>Genre: {this.props.book.genre}</p>
          </div>
          <div>
            <p>Notes: {this.props.book.notes}</p>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default BookEntry;
