import React from "react";
import UpdateTitleForm from "./UpdateTitleForm";
import UpdateAuthorForm from "./UpdateAuthorForm";
import UpdateGenreForm from "./UpdateGenre";
import UpdateNotesForm from "./UpdateNotes";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class BookEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listToShow: []
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    axios
      .delete(`/booklists/${this.props.book.bookTitle}`)
      .then(() => {
        console.log("Successfully deleted current book");
      })
      .catch(err => {
        console.log("Error deleting current book");
      });
  }

  render() {
    return (
      <div>
        <Paper elevation={7}>
          <Typography variant="h6" component="h5" elevation={7}>
            <div class="bookEntry">
              <h3>
                Title: {this.props.book.bookTitle}{" "}
                <UpdateTitleForm
                  currentTitle={this.props.book.bookTitle}
                  user={this.props.user}
                  reRenderTitle={this.props.getBooks}
                />
              </h3>
              <div>
                <p>
                  <strong>Author:</strong> {this.props.book.author}
                </p>
                <UpdateAuthorForm
                  currentAuthor={this.props.book.author}
                  reRenderAuthor={this.props.getBooks}
                />
              </div>
              <div>
                <p>
                  <strong>Genre:</strong> {this.props.book.genre}
                </p>
                <UpdateGenreForm
                  currentGenre={this.props.book.genre}
                  reRenderGenre={this.props.getBooks}
                />
              </div>
              <div>
                <p>
                  <strong>Notes:</strong> {this.props.book.notes}
                </p>
                <UpdateNotesForm
                  currentNotes={this.props.book.notes}
                  reRenderNotes={this.props.getBooks}
                />
              </div>
              <div class="delete-button">
                <Button
                  onClick={() => {
                    this.handleDelete();
                    this.props.getBooks();
                  }}
                  variant="outlined"
                  color="primary"
                >
                  Delete Entry
                </Button>
              </div>
            </div>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default BookEntry;
