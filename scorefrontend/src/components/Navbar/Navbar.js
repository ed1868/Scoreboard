import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import { Redirect } from "react-router-dom";
import Homepage from '../Homepage'
import "./navbar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loggedInUser: this.props["userInSession"] };
    this.service = new AuthService();
    this.redirect = false;
  }

  willReceiveProps(props) {
    this.setState({ ...this.state, loggedInUser: this.props["userInSession"] });
  }

  logOutHandler = (e) => {
    console.log("----props----", this.props);
    this.props.logout();
    this.redirect = true;
  };

  render() {
    if (this.redirect) {
      return <Redirect to="/signIn" />;
    }

    console.log(this.props.userInSession);
    if (this.props.userInSession != null) {
      console.log("esteeee", this.state.loggedInUser);
      return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
                  Dudes Balling Out
                </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Scores
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Tournaments
                  </a>
                </li>
              </ul>
              <span class="navbar-text">
                <Link className="nav-link" to="/logout">
                  <a onClick={this.logOutHandler}>Log Out</a>
                </Link>
              </span>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">

          <Link className="navbar-brand" to="/">
                  Dudes Balling Out
                </Link>
            
          
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Scores
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Tournaments
                  </a>
                </li>
              </ul>
              <span class="navbar-text">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </span>
              <span class="navbar-text">
                <Link className="nav-link" to="/signIn">
                  Log In
                </Link>
              </span>
            </div>
          </nav>
        
        </div>
      );
    }
  }
}
