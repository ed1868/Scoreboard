import React, { Component } from "react";



export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      queryResult: null
    };
    // this.service = new Service();

    
  }
  handleFormSubmit = e => {
    e.preventDefault();

    const query = this.state;

    console.log(this.state);
    console.log(query);

    this.service
      .search({
        query
      })
      .then(resultPayload => {
        console.log(resultPayload);
        this.setState({
          query: "",
          queryResult: resultPayload
        });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;

    if (name === "url") {
      this.setState({ ...this.state, url: e.target.files[0] });
    } else {
      this.setState({ ...this.state, [name]: value });
    }
  };



  render() {
    return (
      <div>

        <div className="home-hero">
          <h1 className="title">Dudes Balling Out Score</h1>
        
          </div>

      </div>
    );
  }
}
