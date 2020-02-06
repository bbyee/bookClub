import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from "@material-ui/core";
import axios from "axios";

//Form component lets users submit an update to any of the book details.

class UpdateAuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedAuthor: "",
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

  //Makes PUT req to update the author
  handleSubmit() {
    let newObj = {};
    newObj.updatedAuthor = this.state.updatedAuthor;
    newObj.currentAuthor = this.props.currentAuthor;

    axios
      .put("/bookAuthor", newObj)
      .then(() => {
        console.log("put req clicked here!");
        let tempObj = {
          updatedAuthor: ""
        };
        this.setState(tempObj);
      })
      .catch(err => {
        if (err) {
          console.log("Error updating author", err);
        } else {
          console.log("Successfully updated author");
        }
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
                name="updatedAuthor"
                label="Author"
                margin="normal"
                fullwidth
                value={this.state.updatedAuthor}
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
                this.handleSubmit();
                this.props.reRenderAuthor();
                this.handleClickClose();
              }}
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

/*When the 'Update' button is clicked, it will submit the information to update into
the database, and also trigger a re-render to grab the newest changes and display it on the page
as if it were refreshed.

This is the same for any of the Update form components.
*/
export default UpdateAuthorForm;
