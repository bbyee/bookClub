import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from "@material-ui/core";
import axios from "axios";

class UpdateBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedTitle: "",
      updatedAuthor: "",
      updatedGenre: "",
      updatedNotes: "",
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
    event.preventDefault();
    let newObj = {};
    newObj.updatedTitle = this.state.updatedTitle;
    newObj.updatedAuthor = this.state.updatedAuthor;
    newObj.updatedGenre = this.state.updatedGenre;
    newObj.updatedNotes = this.state.updatedNotes;

    axios
      .put(`/booklists/${this.props.user.username}`, newObj)
      .then(() => {
        let tempObj = {
          updatedTitle: "",
          updatedAuthor: "",
          updatedGenre: "",
          updatedNotes: ""
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
          Update
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          onOpen={this.handleClickOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Book Details</DialogTitle>
          <Container>
            <div>
              <TextField
                name="updatedTitle"
                label="Book Title"
                placeholder={this.props.currentTitle}
                margin="normal"
                fullwidth
                value={this.state.updatedTitle}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="updatedAuthor"
                label="Author"
                margin="normal"
                fullwidth
                value={this.state.updatedAuthor}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="updatedGenre"
                label="Genre"
                margin="normal"
                fullwidth
                value={this.state.updatedGenre}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="updatedNotes"
                label="Notes"
                margin="normal"
                fullwidth
                value={this.state.updatedNotes}
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
              // onClick={this.handleClickClose}
              // onClick={this.handleSubmit}
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UpdateBookForm;
