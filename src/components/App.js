import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../logo.svg';
import './App.css';
import {setFoo} from "../stateHandlers/actions";

class App_ extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={()=>this.props.setFoo('bar')}/>
          {this.props.foo}
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    foo: state.foo,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setFoo: foo => dispatch(setFoo(foo)),
  }
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App_);

export default App;
