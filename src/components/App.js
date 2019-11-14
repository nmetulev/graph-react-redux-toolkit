import React from "react";
import { connect } from 'react-redux';

import AuthPage from "./AuthPage";
import ControlPage from "./ControlPage";
import "./App.css";

class App_ extends React.Component {
  render() {
    return (
      <div>
        <AuthPage/>
        {(this.props.account) ? <ControlPage/> : <div/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    account: state.account,
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

