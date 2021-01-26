import React, { Component } from "react";
import AuthService from "./AuthService";
import { Redirect } from "react-router-dom";
import "./signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      position: "",
      jerseyNumber: "",
      redirect: false,
    };

    this.authService = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault()

    const {
      username,
      email,
      url,
      password,
      firstName,
      lastName,
      position,
      jerseyNumber,
    } = this.state;

    this.authService
      .signup({
        username,
        email,
        url,
        password,
        firstName,
        lastName,
        position,
        jerseyNumber,
      })
      .then((user) => {
        console.log("hello");
        // this.props.getUser(user);
        this.setState({
          username: "",
          email: "",
          password: "",
          url: "",
          name: "",
          dob: "",
          medicalLicenseNumber: "",
          gender: "",
          redirect: true,
        });
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "url") {
      this.setState({ ...this.state, url: e.target.files[0] });
    } else {
      this.setState({ ...this.state, [name]: value });
    }
  };

  render() {
    if (this.state && this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div id="signUp" className="row justify-content-md-center text-center">
          <div className="col-md-4">
            <form onSubmit={this.handleFormSubmit}>
              <h2>Keep Track of Your Scores!</h2>
              <label htmlFor="username">Username : </label>
              <input
                autoComplete="off"
                className="form-control form"
                id="username"
                name="username"
                onChange={(e) => this.handleChange(e)}
                type="text"
              />

              <label htmlFor="email">Email : </label>
              <input
                autoComplete="off"
                className="form-control form"
                id="email"
                name="email"
                onChange={(e) => this.handleChange(e)}
                type="email"
              />
              <label htmlFor="name">First : </label>
              <input
                autoComplete="off"
                className="form-control form"
                id="firstName"
                name="firstName"
                onChange={(e) => this.handleChange(e)}
                type="text"
              />

              <label htmlFor="name">Last : </label>
              <input
                autoComplete="off"
                className="form-control form"
                id="lastName"
                name="lastName"
                onChange={(e) => this.handleChange(e)}
                type="text"
              />

              <label htmlFor="password">Password : </label>
              <input
                autoComplete="off"
                className="form-control form"
                id="password"
                name="password"
                onChange={(e) => this.handleChange(e)}
                type="password"
              />
              <label htmlFor="url">Profile Photo : </label>
              <input
                className="form-control form"
                type="file"
                name="url"
                onChange={(e) => this.handleChange(e)}
              />

              <label htmlFor="gender">Position : </label>
              <input
                autoComplete="off"
                className="form-control form"
                id="position"
                name="position"
                placeholder="Center , Shooting Guard , Power Forward"
                onChange={(e) => this.handleChange(e)}
                type="text"
              />

              <br></br>

              <button
                type="submit"
                className="btn btn-dark btn-block btn-lg"
                value="SignUp"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
