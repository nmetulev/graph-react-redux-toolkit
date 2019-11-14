import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setAccount,
  setAccessToken,
  loadAllData,
} from "../../stateHandlers/actions";
import logoImg from '../../images/bluemedia-logo.png';
import acctLoginImg from '../../images/account-login-8x.png';
import acctLogoutImg from '../../images/account-logout-8x.png';
import './styles.css'

import {
  GRAPH_REQUESTS,
  isIE,
  msalApp,
  requiresInteraction
} from "./auth-utils";

const useRedirectFlow = isIE();

class AuthPage_ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
    this.initApp = this.initApp.bind(this);
  }

  initApp(account, token) {
    this.props.setAccount(account);
    this.props.setAccessToken(token);
    this.props.loadAllData();
  }

  async acquireToken(request, redirect) {
    return msalApp.acquireTokenSilent(request).catch(error => {
      // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
      // due to consent or interaction required ONLY
      if (requiresInteraction(error.errorCode)) {
        return redirect
          ? msalApp.acquireTokenRedirect(request)
          : msalApp.acquireTokenPopup(request);
      }
    });
  }

  async onSignIn(redirect) {
    if (redirect) {
      return msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
    }

    const loginResponse = await msalApp
      .loginPopup(GRAPH_REQUESTS.LOGIN)
      .catch(error => {
        this.setState({
          error: error.message
        });
      });

    if (loginResponse) {
      this.setState({
        error: null
      });

      const tokenResponse = await this.acquireToken(
        GRAPH_REQUESTS.LOGIN
      ).catch(error => {
        this.setState({
          error: error.message
        });
      });

      if (tokenResponse) {
        this.initApp(loginResponse.account, tokenResponse.accessToken);
      }
    }
  }

  onSignOut() {
    msalApp.logout();
  }

  async componentDidMount() {
    msalApp.handleRedirectCallback(error => {
      if (error) {
        const errorMessage = error.errorMessage ? error.errorMessage : "Unable to acquire access token.";
        // setState works as long as navigateToLoginRequestUrl: false
        this.setState({
          error: errorMessage
        });
      }
    });

    const account = msalApp.getAccount();

    if (account) {
      const tokenResponse = await this.acquireToken(
        GRAPH_REQUESTS.LOGIN,
        useRedirectFlow
      );

      if (tokenResponse) {
        this.initApp(account, tokenResponse.accessToken);
      }
    }
  }

  render() {
    console.log('account:',this.props.account);
    return (
      <div className='header'>
        <div className='logo-container'>
          <img src={logoImg}/>
        </div>
        {!this.props.account ? (
          <div className='acct-btn-container' onClick={() => this.onSignIn(useRedirectFlow)}>
            <img src={acctLoginImg}/>
          </div>
        ) : (
          <div className='acct-btn-container' onClick={this.onSignOut}>
          <img src={acctLogoutImg}/>
          </div>
        )}
        {this.state.error && (
          <p className="error">Error: {this.error}</p>
        )}
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
    setAccount:     account =>      dispatch(setAccount(account)),
    setAccessToken: accessToken =>  dispatch(setAccessToken(accessToken)),
    loadAllData:   () =>           dispatch(loadAllData()),
  }
};

const Index = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage_);

export default Index;
