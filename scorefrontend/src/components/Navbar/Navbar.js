import React, { Component } from "react";
import { Link } from "react-router-dom";
// import AuthService from "../auth/AuthService";
import { Redirect } from "react-router-dom";

import "./navbar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loggedInUser: this.props["userInSession"] };
    // this.service = new AuthService();
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
      return <Redirect to="/login" />;
    }

    console.log(this.props.userInSession);
    if (this.props.userInSession != null) {
      console.log("esteeee", this.state.loggedInUser);
      return (
        <div>
          <nav className="navbar navbar-expand">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">
                  {/* <img id="logo" src={Logo} alt="vitality" /> */}
                </Link>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/cases">Cases</Link>
                </li>
                <li>
                  <Link to="/community">Community</Link>
                </li>
                <li>
                  <Link to="/:id/user-profile">Profile</Link>
                </li>
                <li>
                  <Link to="/auth/logout">
                    <a onClick={this.logOutHandler}>Logout</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
              Dudes Balling Out
            </a>
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
                  Sign Up!
                </Link>
              </span>
            </div>
          </nav>
        </div>
      );
    }
  }
}
