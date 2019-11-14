import React from "react";
import { connect } from 'react-redux';

import AuthPage from "./AuthPage";
import "./App.css";

class App_ extends React.Component {
  render() {
    return <AuthPage/>;
  }
}

const mapStateToProps = state => {
  return{
    setMsalApp: state.setMsalApp,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    // setTokenExpirationTime:   tokenExpirationTime => dispatch(setTokenExpirationTime(tokenExpirationTime)),
  }
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App_);

export default App;

