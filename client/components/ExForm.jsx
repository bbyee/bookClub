import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from "@material-ui/core";
import axios from 'axios';


class ExForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
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
    newObj.firstName = this.state.firstName;
    newObj.lastName = this.state.lastName;
    newObj.username = this.state.username;
    newObj.password = this.state.password;

    axios
      .post("/users", newObj)
      .then(() => {
        let tempObj = {
          username: "",
          firstName: "",
          lastName: "",
          password: ""
        };
        this.setState(tempObj);
        console.log("Successfully posted new user to DB!");
      })
      .catch(err => {
        console.log("Error in post request to users", err);
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
          HERE
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          onOpen={this.handleClickOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Account</DialogTitle>
          <Container>
            <div>
              <TextField
                name="firstName"
                label="First Name:"
                margin="normal"
                fullwidth
                value={this.state.firstName}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="lastName"
                label="Last Name:"
                margin="normal"
                fullwidth
                value={this.state.lastName}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="username"
                label="Username:"
                margin="normal"
                fullwidth
                value={this.state.username}
                onChange={this.handleChange}
              ></TextField>
            </div>
            <div>
              <TextField
                name="password"
                label="Password:"
                margin="normal"
                fullwidth
                value={this.state.password}
                onChange={this.handleChange}
              ></TextField>
            </div>
          </Container>

          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleClickClose}
              onClick={this.handleSubmit}
              color="primary"
            >
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
// export default function FormDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         HERE
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">Create New Account</DialogTitle>
//         <DialogContent>
//           <TextField name="firstName" label></TextField>
//           <DialogContentText>
//             To subscribe to this website, please enter your email address here.
//             We will send updates occasionally.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Subscribe
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

export default ExForm;
