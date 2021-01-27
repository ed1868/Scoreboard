import React, { Component } from "react";
import AuthService from "./AuthService";
import { Redirect } from "react-router-dom";
import NavBar from '../Navbar/Navbar'

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      redirect: false
    };

    this.authService = new AuthService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    this.authService.login({ username, password }).then(user => {
      this.props.getUser(user);
      this.setState({ ...this.state, redirect: true });
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    if (!this.state.redirect) {
      return (
        <div>
        
          <div className="row justify-content-md-center text-center">
            <div className="col-md-6">
              <form onSubmit={this.handleFormSubmit}>
                <h2>Welcome Back ! </h2>

                <label htmlFor="username">Username : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                <label htmlFor="password">Password : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={e => this.handleChange(e)}
                  type="password"
                />
                <br></br>
                <button
                  type="submit"
                  className="btn btn-dark btn-block btn-lg"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}