import {
  SET_ACCESS_TOKEN,
  SET_ACCOUNT,
  SET_MSAL_APP, SET_MY_TEAMS
} from "./actionTypes";
import {setAccessTokenApi, fetchMyTeamsApi} from './api';

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

function setMyTeams(myTeams) {
  return {
    type: SET_MY_TEAMS,
    myTeams: myTeams,
  }
}

export function fetchMyTeams() {
  return _apiCall({
    apiFunc: fetchMyTeamsApi,
    apiFuncParam: [],
    rcvdFunc: setMyTeams,
  });
}


function _apiCall(options={}){
  return (dispatch) => {
    let promise;
    if(typeof options.apiFuncParam==='object') {
      promise = options.apiFunc(...options.apiFuncParam)
    } else {
      promise = options.apiFunc(options.apiFuncParam)
    }
    return promise
      .then(response=>{
        if(options.rcvdFunc) {
          // *.value is the MS Graph response specification
          return dispatch(options.rcvdFunc(response.value));
        } else {
          return response;
        }
      })
      .catch(err=>{
        console.error('actions._apiCall:',err);
        throw err;
      });
  };
}
