import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from "@material-ui/core";
import axios from "axios";

class UpdateGenreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedGenre: "",
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
    newObj.updatedGenre = this.state.updatedGenre;
    newObj.currentGenre = this.props.currentGenre;

    axios
      .put("/bookGenre", newObj)
      .then(() => {
        console.log("put req clicked here!");
        let tempObj = {
          updatedGenre: ""
        };
        this.setState(tempObj);
      })
      .catch(err => {
        if (err) {
          console.log("Error updating genre", err);
        } else {
          console.log("Successfully updated genre");
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
                name="updatedGenre"
                label="Genre"
                margin="normal"
                fullwidth
                value={this.state.updatedGenre}
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

export default UpdateGenreForm;
