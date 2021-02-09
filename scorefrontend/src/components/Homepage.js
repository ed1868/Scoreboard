import React, { Component } from "react";
import AuthService from "../components/Auth/AuthService";
import { Link } from "react-router-dom";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loggedInUser: this.props["userInSession"],
      oponent: this.props["opponent"],
      userData: this.props["userData"]
    };
    this.service = new AuthService();
    this.redirect = false;
  }


  willReceiveProps(props) {
    this.setState({
      ...this.state,
      loggedInUser: this.props["userInSession"],
      oponent: this.props["opponent"],
    });
  


  }

  logOutHandler = (e) => {
    console.log("----props----", this.props);
    this.props.logout();
    this.redirect = true;
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const query = this.state;

    console.log(this.state);
    console.log(query);

    this.service
      .search({
        query,
      })
      .then((resultPayload) => {
        console.log(resultPayload);
        this.setState({
          query: "",
          queryResult: resultPayload,
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
    console.log("HOME PAGE USER IN SESSION : ", this.props.userInSession);
    if (this.props.userInSession != null && this.props.opponent !=null) {
      console.log("HOME PAGE USER: ", this.state.loggedInUser);
      return (
        <div>
          <div className="home-hero pt-5">
            <h1 className="title">Dudes Balling Out Score</h1>
          </div>
          <section className="scoreSection">
            <div className="container">
              <div className="row mt-5">
                <div className="col-md-5">
                  <h2>{this.props.userInSession.username}</h2>
                  <h2>{this.props.userInSession.score}</h2>
                  <Link className="btn btn-success mt-4 mb-3" to="/addMatch">
                    Add Match
                  </Link>
                </div>
                <div className="col-md-2">
                  <h4>Vs</h4>
                </div>

                <div className="col-md-5">
                  <h2>{this.props.opponent.username}</h2>
                  <h2>{this.props.opponent.score}</h2>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      console.log('ENTERING IN THE ELSE AT HOME ')
      return (
        <div>
          <div>
            <div className="home-hero pt-5">
              <h1 className="title">Dudes Balling Out Score</h1>
            </div>
            <section className="scoreSection">
              <div className="container">
                <div className="row mt-5">
                  <div className="col-md-5">
                    <h2>Hwek21</h2>
                    <h2>1</h2>
                  </div>
                  <div className="col-md-2">
                    <h4>Versus</h4>
                  </div>

                  <div className="col-md-5">
                    <h2>Josh21</h2>
                    <h2>1</h2>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
  }
}
