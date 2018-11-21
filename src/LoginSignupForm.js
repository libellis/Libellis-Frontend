import React, { Component } from 'react';
import { Form, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, login } from './actions';
import './LoginSignupForm.css';

const MIN_PASSWORD_LENGTH = 5;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      showSignup: false,
      errors: []
    }
  }

  // Handles login and signup button and flips state
  // Also removes all errors
  handleClick = (show) => {
    this.setState({
      showSignup: show,
      errors: []
    })
  }

  /** 
   * Handle Login/SignUp form submissions
   * Also handle minimum password requirements
   */
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { username, password, first_name, last_name, email } = this.state;

    // if password is not long enough set error on state
    if (this.state.showSignup && password.length < MIN_PASSWORD_LENGTH) {
      this.setState({ errors: ["Password must at least 5 characters in legnth"] });
      return;
    }

    //put some thunks here
    if (this.state.showSignup) {
      this.props.register({ username, password, first_name, last_name, email });
    } else {
      this.props.login({ username, password })
    }

    //reset input fields
    this.resetInputs();
  }

  /** Control input fields */
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  resetInputs = () => {
    this.setState({
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      showSignup: false,
      errors: []
    })
  }


  /** helper function returns the fields for the Sign Up form */
  signUpFields() {
    return (
      <React.Fragment>
        <label className="mt-2" htmlFor="first_name">First Name</label>
        <Input id="first_name" name="first_name"
          value={this.state.first_name}
          onChange={this.handleChange}
          type='text' />

        <label className="mt-2" htmlFor="last_name">Last Name</label>
        <Input id="last_name" name="last_name"
          value={this.state.last_name}
          type='text'
          onChange={this.handleChange} />

        <label className="mt-2" htmlFor="email">Email</label>
        <Input id="email" name="email"
          value={this.state.email}
          type='email'
          onChange={this.handleChange} />
      </React.Fragment>
    );
  }


  /* 
  * Renders a login form. Buttons are provided
  * to toggle the login and sign up forms 
  */
  render() {
    if (this.props.currentUser) return <Redirect to='/' />
    return (
      <div className="Login mt-5">
        <ButtonGroup className="d-flex justify-content-end">
          <Button
            className="Button"
            color="primary"
            onClick={(evt) => this.handleClick(false)}
            active={!this.state.showSignup ? true : false}>Login</Button>
          <Button
            className="Button btn-primary"
            color="secondary"
            onClick={(evt) => this.handleClick(true)}
            active={this.state.showSignup ? true : false}>Signup</Button>
        </ButtonGroup>
        <Form onSubmit={this.handleSubmit} className="LoginForm p-5 rounded">
          <label className="mt-2" htmlFor="username">Username</label>
          <Input id="username" name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type='text' />

          <label className="mt-2" htmlFor="password">Password</label>
          <Input id="password" name="password"
            value={this.state.password}
            type='password'
            onChange={this.handleChange} />
          {this.state.showSignup ? this.signUpFields() : ''}
          <br />
          {this.state.errors.map(error => <Alert key={error} color="warning">{error}</Alert>)}
          <Button color="primary">Submit</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { register, login })(Login);