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
            <div className="container-fluid">
              <a class="navbar-brand" href="#">
                Navbar
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">
                    Disabled
                  </a>
                </li>
              </ul>

              <form class="form-inline my-2 my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                />
                <button
                  class="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
      );
    }
  }
}
