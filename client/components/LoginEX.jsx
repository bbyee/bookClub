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
        Don't have an account? Click <RegisterForm /> to register now!
      </div>
    );
  }
}
