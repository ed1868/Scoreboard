import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import { configureStore } from "../Store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main";
import Signup from "./components/Auth/signup";
import SignIn from "./components/Auth/signIn";
import Homepage from "./components/Homepage";
import MatchForm from "./components/Match/matchForm";

// const store = configureStore();
import authService from "./components/Auth/AuthService";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      opponent: null,
      userData: null,
    };

    this.authService = new authService();

    this.fetchUser();
    this.opponent();
    this.userData();
  }
  // console.log('HELLO : ',props)
  fetchUser = () => {
    console.log("fetching user");
    this.authService
      .loggedin()
      .then((user) => this.setState({ ...this.state, user }));
  };

  userData = () => {
    let users = [];
    console.log("FETCHING USERS");
    this.authService.usersData().then((userData) => {
      console.log(
        "THIS IS THE PAYLOAD DATA BACK RFOM BACKEND: ",
        typeof userData
      );

      userData.map((user) => {
        console.log("ONE USER : ", user);
        users.push(user);
      });
    });

    let userOne = users[0];
    let userTwo = users[1];

    this.setState({ ...this.state.userOne, userOne });


  };

  opponent = () => {
    console.log("Fetching opponent");
    this.authService
      .opponent()
      .then((opponent) => this.setState({ ...this.state, opponent }));
  };
  getUser = (user) => {
    console.log("get --- user");
    this.setState({ ...this.state, user });
  };

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar
            fetchUser={this.fetchUser}
            userInSession={this.state.user}
            logout={this.logout}
          />

          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Homepage
                  fetchUser={this.fetchUser}
                  userInSession={this.state.user}
                  userData={this.state.getUserData}
                  opponent={this.state.opponent}
                  logout={this.logout}
                />
              )}
            />

            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getUser} />}
            />

            <Route
              exact
              path="/signIn"
              render={() => <SignIn getUser={this.getUser} />}
            />

            <Route
              exact
              path="/logout"
              render={() => (
                <Main getUser={this.getUser} logout={this.logout} />
              )}
            />

            <Route
              exact
              path="/addMatch"
              render={() => (
                <MatchForm
                  getUser={this.getUser}
                  userInSession={this.state.user}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
