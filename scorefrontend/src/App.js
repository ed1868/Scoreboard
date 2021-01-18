import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import { configureStore } from "../Store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main";
import Signup from "./components/Auth/signup"

// const store = configureStore();

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };

    // this.authService = new AuthService();

    // this.fetchUser();
  }

  fetchUser = () => {
    // this.authService
    //   .loggedin()
    //   .then(user => this.setState({ ...this.state, user }));
  };

  getUser = (user) => {
    this.setState({ ...this.state, user });
  };

  logout = () => {
    // this.authService
    //   .logout()
    //   .then(() => this.setState({ ...this.state, user: null }));
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
