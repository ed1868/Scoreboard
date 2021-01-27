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

// const store = configureStore();
import authService from "./components/Auth/AuthService";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };

    this.authService = new authService();

    this.fetchUser();
  }
// console.log('HELLO : ',props)
  fetchUser = () => {
    console.log('fetching user')
    this.authService
      .loggedin()
      .then((user) => this.setState({ ...this.state, user }));
  };

  getUser = (user) => {
    console.log('get --- user')
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
              render={() => <Main getUser={this.getUser} />}
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
