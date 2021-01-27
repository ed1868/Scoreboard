import React, { Component } from "react";

export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      currentScore: "",
    };
    // this.service = new Service();
    
  }
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
    console.log('LA POINGA L: ',this.props)
    return (
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
    );
  }
}
