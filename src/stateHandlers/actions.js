import {
  SET_ACCOUNT,
  SET_MSAL_APP
} from "./actionTypes";

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
