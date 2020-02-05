import React from "react";
import axios from "axios";
import BookList from "../client/components/BookList";
import ExForm from "../client/components/ExForm";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    this.addBook = this.addBooks.bind(this);
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

  addBook() {}

  render() {
    return (
      <div>
        <h1>Book Club</h1>
        {this.state.user ? (
          <div>
            <Welcome user={this.state.user} onSignOut={this.signOut} />
            <button onClick={this.getBooks}>List</button>
            <button onClick={this.addBook}>Add Book</button>
            {this.state.booksToDisplay.length > 0 ? (
              <div>
                <BookList books={this.state.booksToDisplay} />
              </div>
            ) : (
              <h2>Currently no books saved</h2>
            )}
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
    <div>
      Welcome <strong> {user.username} </strong>!
      <a href="javascript:;" onClick={onSignOut}>
        Sign out
      </a>
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
      <div>
        <form onSubmit={this.handleSignIn}>
          <h3>Sign in</h3>
          <input type="text" ref="username" placeholder="enter you username" />
          <input type="password" ref="password" placeholder="enter password" />
          <input type="submit" value="Login" />
        </form>
        Don't have an account? Click <ExForm /> to register now!
      </div>
    );
  }
}

export default App;
