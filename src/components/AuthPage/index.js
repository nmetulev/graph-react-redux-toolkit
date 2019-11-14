import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {MSALAuthenticationProviderOptions} from "@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions";
// import {ImplicitMSALAuthenticationProvider} from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
// import * as MicrosoftGraph from "@microsoft/microsoft-graph-client";

import {
  setAccount,
  setMsalApp,
  setAccessToken,
  fetchMyTeams,
} from "../../stateHandlers/actions";

import {
  fetchMsGraph,
  GRAPH_ENDPOINTS,
  GRAPH_REQUESTS,
  GRAPH_SCOPES,
  isIE,
  msalApp,
  requiresInteraction
} from "../auth-utils";

const useRedirectFlow = isIE();

const Json = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

class AuthPage_ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      error: null,
      emailMessages: null,
      graphProfile: null
    };

    this.getMe = this.getMe.bind(this);
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
        account: loginResponse.account,
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
        this.props.setAccessToken(tokenResponse.accessToken);
        const graphProfile = await fetchMsGraph(
          GRAPH_ENDPOINTS.ME,
          tokenResponse.accessToken
        ).catch(() => {
          this.setState({
            error: "Unable to fetch Graph profile."
          });
        });

        if (graphProfile) {
          this.setState({
            graphProfile
          });
        }

        if (tokenResponse.scopes.indexOf(GRAPH_SCOPES.MAIL_READ) > 0) {
          return this.readMail(tokenResponse.accessToken);
        }
      }
    }
  }

  onSignOut() {
    msalApp.logout();
  }

  async onRequestEmailToken() {
    const tokenResponse = await this.acquireToken(
      GRAPH_REQUESTS.EMAIL,
      useRedirectFlow
    ).catch(e => {
      this.setState({
        error: "Unable to acquire access token for reading email."
      });
    });

    if (tokenResponse) {
      return this.readMail(tokenResponse.accessToken);
    }
  }

  async readMail(accessToken) {
    const emailMessages = await fetchMsGraph(
      GRAPH_ENDPOINTS.MAIL,
      accessToken
    ).catch(() => {
      this.setState({
        error: "Unable to fetch email messages."
      });
    });

    if (emailMessages) {
      this.setState({
        emailMessages,
        error: null
      });
    }
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

    this.props.setAccount(account);
    this.props.setMsalApp(msalApp);
    this.setState({
      account
    });

    if (account) {
      const tokenResponse = await this.acquireToken(
        GRAPH_REQUESTS.LOGIN,
        useRedirectFlow
      );

      if (tokenResponse) {
        const graphProfile = await fetchMsGraph(
          GRAPH_ENDPOINTS.ME,
          tokenResponse.accessToken
        ).catch(() => {
          this.setState({
            error: "Unable to fetch Graph profile."
          });
        });

        if (graphProfile) {
          this.setState({
            graphProfile
          });
        }

        if (tokenResponse.scopes.indexOf(GRAPH_SCOPES.MAIL_READ) > 0) {
          return this.readMail(tokenResponse.accessToken);
        }
      }
    }
  }

  async getMe() {
    this.props.fetchMyTeams();
    // const graphScopes = ["user.read"];
    // const options1 = new MSALAuthenticationProviderOptions(graphScopes);
    // const authProvider = new ImplicitMSALAuthenticationProvider(msalApp, options1);
    // const options2 = {
    //   authProvider, // An instance created from previous step
    // };
    // const Client = MicrosoftGraph.Client;
    // const client = Client.initWithMiddleware(options2);
    // try {
    //   let userDetails = await client.api("/me").get();
    //   console.log(userDetails);
    // } catch (error) {
    //   throw error;
    // }
  }

  render() {
    return (
      <div>
        <section>
          <h1>
            Welcome to the Microsoft Authentication Library For
            Javascript - React Quickstart
          </h1>
          {!this.state.account ? (
            <button onClick={() => this.onSignIn(useRedirectFlow)}>Sign In</button>
          ) : (
            <>
              <button onClick={this.onSignOut}>
                Sign Out
              </button>
              <button onClick={this.onRequestEmailToken}>
                Request Email Permission
              </button>
              <button onClick={this.getMe}>
                Get ME
              </button>
            </>
          )}
          {this.state.error && (
            <p className="error">Error: {this.error}</p>
          )}
        </section>
        <section className="data">
          {this.state.account && (
            <div className="data-account">
              <h2>Session Account Data</h2>
              <Json data={this.state.account} />
            </div>
          )}
          {this.state.graphProfile && (
            <div className="data-graph">
              <h2>Graph Profile Data</h2>
              <Json data={this.state.graphProfile} />
            </div>
          )}
          {this.state.emailMessages && (
            <div className="data-graph">
              <h2>Messages Data</h2>
              <Json data={this.state.emailMessages} />
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    // accountsById: state.accountsById,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    setAccount:     account =>      dispatch(setAccount(account)),
    setMsalApp:     msalApp =>      dispatch(setMsalApp(msalApp)),
    setAccessToken: accessToken =>  dispatch(setAccessToken(accessToken)),
    fetchMyTeams:   () =>           dispatch(fetchMyTeams()),
  }
};

const Index = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage_);

export default Index;
