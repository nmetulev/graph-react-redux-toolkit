import React from "react";
import { connect } from 'react-redux';

import AuthPage from "./AppHeader";
import ControlPage from "./ControlPage";
import "./App.css";
import {Providers} from'@microsoft/mgt/dist/es6/Providers';
import {MsalProvider} from '@microsoft/mgt/dist/es6/providers/MsalProvider';
import { LoginType, ProviderState } from "@microsoft/mgt/dist/es6/providers/IProvider";
import { loadAllData } from "../stateHandlers/actions";

class App_ extends React.Component {

  componentDidMount(){

    let scopes = [
            "User.Read",
            "User.ReadWrite",
            "User.ReadBasic.All",
            "User.Read.All",
            "User.ReadWrite.All",
            "Directory.Read.All",
            "Directory.ReadWrite.All",
            "Directory.AccessAsUser.All",
            "Group.Read.All",
            "Group.ReadWrite.All"
          ]

    Providers.globalProvider = new MsalProvider({
      clientId: "958845a3-6c6d-4e10-9ebd-cf6f415a89c6",
      loginType: LoginType.Popup,
      scopes: scopes
    });

    Providers.globalProvider.onStateChanged(() => {
      if (Providers.globalProvider.state == ProviderState.SignedIn) {
        this.props.loadAllData();
      }
    });
  }


  render() {
    return (
      <div className='app-container'>
        <AuthPage/>
        <ControlPage/>}
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
    loadAllData:   () =>           dispatch(loadAllData()),
    // setTokenExpirationTime:   tokenExpirationTime => dispatch(setTokenExpirationTime(tokenExpirationTime)),
  }
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App_);

export default App;

