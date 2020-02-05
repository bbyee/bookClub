import React from "react";
import axios from "axios";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: ""
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
      <div class="register">
        <h3>Create Account:</h3>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          ></input>
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          ></input>
        </label>
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
        <button onClick={this.handleSubmit}>Register</button>
      </div>
    );
  }
}

export default RegisterForm;
