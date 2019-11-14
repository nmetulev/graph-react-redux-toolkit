import {
  SET_ACCESS_TOKEN,
  SET_ACCOUNT,
  SET_MSAL_APP
} from "./actionTypes";
import {setAccessTokenApi} from './api';

export function setMsalApp(msalApp) {
  return {
    type: SET_MSAL_APP,
    msalApp: msalApp
  }
}

export function setAccount(account) {
  return {
    type: SET_ACCOUNT,
    account: account
  }
}

export function setAccessToken(accessToken) {
  setAccessTokenApi(accessToken);
  return {
    type: SET_ACCESS_TOKEN,
    accessToken: accessToken,
  }
}
