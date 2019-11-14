import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Msal from "msal";

import logo from '../logo.svg';
import './App.css';
import {setFoo} from "../stateHandlers/actions";

const msalConfig = {
  auth: {
    clientId: '958845a3-6c6d-4e10-9ebd-cf6f415a89c6'
  }
};
const msalInstance = new Msal.UserAgentApplication(msalConfig);

msalInstance.handleRedirectCallback((error, response) => {
  console.log(`handleRedirectCallback error:${error} response:${response}`);
});

class App_ extends Component {
  login() {
    // if the user is already logged in you can acquire a token
    if (msalInstance.getAccount()) {
      console.log('already logged in.  getting token');
      var tokenRequest = {
        scopes: ["user.read", "mail.send"]
      };
      msalInstance.acquireTokenSilent(tokenRequest)
        .then(response => {
          console.log(`login acquireTokenSilent response:${response}`);
        })
        .catch(err => {
          console.error(`login acquireTokenSilent err:${err}`);
          // could also check if err instance of InteractionRequiredAuthError if you can import the class.
          if (err.name === "InteractionRequiredAuthError") {
            return msalInstance.acquireTokenPopup(tokenRequest)
              .then(response => {
                console.error(`login acquireTokenSilent err:${err} response:${response}`);
                // get access token from response
                // response.accessToken
              })
              .catch(err2 => {
                console.error(`login acquireTokenSilent err:${err} err2:${err2}`);
                // handle error
              });
          }
        });
    } else {
      console.log('login needed');
      var loginRequest = {
        scopes: ["user.read", "mail.send"] // optional Array<string>
      };

      msalInstance.loginPopup(loginRequest)
        .then(response => {
          console.log(`login response:${response}`);
        })
        .catch(err => {
          console.error(`login err:${err}`);
        });
    }
  }

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={()=>this.props.setFoo('bar')}/>
          {this.props.foo}
          <button onClick={this.login}>LOGIN</button>
        </div>
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
