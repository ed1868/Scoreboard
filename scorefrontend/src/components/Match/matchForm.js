import React, { Component } from "react";
import MatchService from "./MatchService";
import { Redirect } from "react-router-dom";

export default class MatchForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      finalScore: "yes",
      matchOneWinner: "yes",
      matchTwoWinner: "yes",
      matchThreeWinner: "yes",
      redirect: false,
    };

    this.matchService = new MatchService();
  }

  willReceiveProps(props) {
    this.setState({ ...this.state, loggedInUser: this.props["userInSession"] });
  }


  handleFormSubmit = (e) => {
    e.preventDefault();

    const {
    
      finalScore,
      matchOneWinner,
      matchTwoWinner,
      matchThreeWinner,
    } = this.state;

    const username = this.props["userInSession"].username;
    console.log('THE ADDED USER NAME: ', username);

    this.matchService
      .add({
        username,
        finalScore,
        matchOneWinner,
        matchTwoWinner,
        matchThreeWinner,
      })
      .then((user) => {
        this.props.getUser(user);
        this.setState({ ...this.state, redirect: true });
      });
  };

  handleChange = (e) => {
    
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    console.log("MATCH PAGE USER IN SESSION : ", this.props.userInSession);
    if (!this.state.redirect) {
      return (
        <div>
          <div className="row justify-content-md-center text-center">
            <div className="col-md-6">
              <form onSubmit={this.handleFormSubmit}>
                <h2>Add New Match</h2>

                <div className="form-group">
                  <label htmlFor="finalScore">Did you win the whole set?</label>
                  <select onChange={(e) => this.handleChange(e)} name="finalScore" className="form-control" id="finalScore">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="matchOneWinner">Did you win game one?</label>
                  <select onChange={(e) => this.handleChange(e)} name="matchOneWinner" className="form-control" id="matchOneWinner">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="matchTwoWinner">Did you win game two?</label>
                  <select onChange={(e) => this.handleChange(e)} name="matchTwoWinner" className="form-control" id="matchTwoWinner">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="matchThreeWinner">Did you win game three?</label>
                  <select onChange={(e) => this.handleChange(e)} name="mastchThreeWinner" className="form-control" id="matchThreeWinner">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>

                <br></br>
                <button type="submit" className="btn btn-dark btn-block btn-lg">
                  Submit
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
