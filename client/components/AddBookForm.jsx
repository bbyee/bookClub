import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from "@material-ui/core";
import axios from "axios";

class AddBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBookTitle: "",
      addBookAuthor: "",
      addBookGenre: "",
      addBookNotes: "",
      open: false
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClickClose() {
    this.setState({ open: false });
  }

  handleChange(event) {
    let temp = {};
    temp[event.target.name] = event.target.value;
    this.setState(temp);
  }

  handleSubmit(event) {
    //console.log("HERHERHERHEHR", this.props.user.username);
    event.preventDefault();
    let newObj = {};
    newObj.addBookTitle = this.state.addBookTitle;
    newObj.addBookAuthor = this.state.addBookAuthor;
    newObj.addBookGenre = this.state.addBookGenre;
    newObj.addBookNotes = this.state.addBookNotes;

    axios
      .post(`/booklists/${this.props.user.username}`, newObj)
      .then(() => {
        let tempObj = {
          addBookTitle: "",
          addBookAuthor: "",
          addBookGenre: "",
          addBookNotes: ""
        };
        this.setState(tempObj);
        console.log("Successfully added new book!");
      })
      .catch(err => {
        console.log("Error adding new book", err);
      });
  }

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add Book
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          onOpen={this.handleClickOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Book Details</DialogTitle>
          <Container>
            <div>
              <TextField
                name="addBookTitle"
                label="Book Title"
                margin="normal"
                fullwidth
                value={this.state.addBookTitle}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="addBookAuthor"
                label="Author"
                margin="normal"
                fullwidth
                value={this.state.addBookAuthor}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="addBookGenre"
                label="Genre"
                margin="normal"
                fullwidth
                value={this.state.addBookGenre}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="addBookNotes"
                label="Notes"
                margin="normal"
                fullwidth
                value={this.state.addBookNotes}
                onChange={this.handleChange}
              ></TextField>
            </div>
          </Container>

          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.handleClickClose();
                this.handleSubmit();
              }}
              color="primary"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddBookForm;
