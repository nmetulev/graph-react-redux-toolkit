import {
  SET_MSAL_APP
} from "./actionTypes";

const initialState = {
  msalApp: null,
  account: null,
  accessToken: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MSAL_APP:
      return {...state, ...{msalApp:action.msalApp}};

    default:
      return state
  }
}

export default reducer;

