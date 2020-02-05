import React from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import BookList from "./BookList";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showRegistration: false,
      books: []
    };

    //bind methods here:
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let temp = {};
    temp[event.target.name] = event.target.value;
    this.setState(temp);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newObj = {};
    newObj.username = this.state.username;
    newObj.password = this.state.password;

    //make axios request to load this users booklist
    axios
      .get("/booklists", newObj)
      .then(response => {
        console.log("response from get req", response);
        this.setState({ books: response.data });
        console.log("current state here", this.state.books);
      })
      .catch(err => {
        console.log("Error getting users books", err);
      });
  }

  render() {
    return (
      <div>
        <div class="login">
          <h3>Login:</h3>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
          </label>
          <button onClick={this.handleSubmit}>SIGN IN</button>
          <p>
            Don't have an account? Click{" "}
            <button
              onClick={() =>
                this.setState({
                  showRegistration: !this.state.showRegistration
                })
              }
            >
              here
            </button>{" "}
            to create a new one
          </p>
          {this.state.showRegistration ? (
            <div>
              <RegisterForm />
            </div>
          ) : null}
        </div>
        <div>
          <BookList books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default LoginForm;
