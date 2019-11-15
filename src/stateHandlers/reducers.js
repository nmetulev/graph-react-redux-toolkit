import {
  SET_ACCESS_TOKEN,
  SET_ACCOUNT,
  SET_MY_TEAMS
} from "./actionTypes";

const initialState = {
  account: null,
  accessToken: null,
  myTeams: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return {...state, ...{account:action.account}};
    case SET_ACCESS_TOKEN:
      return {...state, ...{accessToken:action.accessToken}};
    case SET_MY_TEAMS:
      console.log('action.myTeams:',action.myTeams);
      return {...state, ...{myTeams:action.myTeams}};

    default:
      return state
  }
}

export default reducer;

