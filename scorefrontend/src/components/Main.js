import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";

const Main = props => {
  console.log('HELLO : ',props)
  return (
    <div className="container">
      <Switch>
        {/* <Route exact path="/" render={props => <Homepage {...props} />} /> */}
      </Switch>
    </div>
  );
};

export default Main