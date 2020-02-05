import React from "react";
import axios from "axios";
import BookList from "../client/components/BookList";
import RegisterForm from "../client/components/RegisterForm";
import AddBookForm from "../client/components/AddBookForm";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      booksToDisplay: []
    };

    //bind methods here:
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  //sign in and set state to hold username and pw
  signIn(username, password) {
    this.setState({
      user: {
        username,
        password
      }
    });
  }

  // resets state back to null
  signOut() {
    this.setState({ user: null, booksToDisplay: [] });
  }

  getBooks() {
    axios
      .get(`/booklists/${this.state.user.username}`)
      .then(response => {
        console.log("RESPONSE HERE", response);
        this.setState({ booksToDisplay: response.data });
        console.log("After setstate", this.state.booksToDisplay);
      })
      .catch(err => {
        console.log("Error getting all books", err);
      });
  }

  render() {
    return (
      <div id="main">
        <h1>Book Club</h1>
        {this.state.user ? (
          <div>
            <Welcome user={this.state.user} onSignOut={this.signOut} />
            <div class="home-buttons">
              <Button
                variant="outlined"
                color="primary"
                onClick={this.getBooks}
              >
                List
              </Button>
              <AddBookForm user={this.state.user} />
            </div>
            {this.state.booksToDisplay.length > 0 ? (
              <div>
                <BookList
                  getBooks={this.getBooks}
                  user={this.state.user}
                  books={this.state.booksToDisplay}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <LoginForm onSignIn={this.signIn} />
        )}
      </div>
    );
  }
}

const Welcome = ({ user, onSignOut }) => {
  return (
    <div class="welcome">
      Welcome <strong> {user.username}</strong>!{" "}
      <span>
        {" "}
        <Button variant="outlined" color="primary" ß>
          <a href="javascript:;" onClick={onSignOut}>
            Sign out
          </a>
        </Button>
      </span>
    </div>
  );
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null
    };

    //bind methods here:
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  handleSignIn(event) {
    event.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSignIn(username, password);
  }

  handleClickOpen() {
    this.setState({ form: true });
  }

  handleClickClose() {
    this.setState({ form: false });
  }

  render() {
    return (
      <Container id="mainBody" component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.handleSignIn} noValidate>
            <container class="input-container">
              <input
                class="username"
                type="text"
                ref="username"
                placeholder="enter username"
              />
              <input
                class="password"
                type="password"
                ref="password"
                placeholder="enter password"
              />
            </container>

            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container class="register-container">
              {/* <Grid item>
                Don't have an account? Click <RegisterForm /> to register now!
              </Grid> */}
              <span class="register-line">Don't have an account? Click</span>{" "}
              <RegisterForm />
              <span class="register-line">to register now!</span>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

export default App;
