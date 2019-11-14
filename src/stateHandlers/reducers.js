import {
  SET_FOO
} from "./actionTypes";

const initialState = {
  foo: '[not set]',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FOO:
      return {...state, ...{foo:action.foo}};

    default:
      return state
  }
}

export default reducer;

