import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from "@material-ui/core";
import axios from "axios";

class UpdateTitleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedTitle: "",
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
    newObj.currentTitle = this.props.currentTitle;

    axios
      .put("/bookTitle", newObj)
      .then(() => {
        console.log("put req clicked here!");
        let tempObj = {
          updatedTitle: ""
        };
        this.setState(tempObj);
        t;
      })
      .catch(err => {
        if (err) {
          console.log("Error updating book title", err);
        } else {
          console.log("Successfully updated book title");
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
                name="updatedTitle"
                label="Book Title"
                margin="normal"
                fullwidth
                value={this.state.updatedTitle}
                onChange={this.handleChange}
              ></TextField>
            </div>
          </Container>

          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UpdateTitleForm;
