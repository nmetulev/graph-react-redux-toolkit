import {
  SET_ACCESS_TOKEN,
  SET_ACCOUNT,
  SET_MY_TEAMS,
  SET_GROUP_MEMBERS,
  SELECT_GROUP,
  SELECT_MEMBER,
  SET_MEMBER_NAME_FILTER
} from "./actionTypes";

const initialState = {
  account: null,
  accessToken: null,
  myTeams: [],
  seletedGroup: null,
  seletedMember: null,
  membersByGroup: {},
  memberNameFilter: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return {...state, ...{account:action.account}};
    case SET_ACCESS_TOKEN:
      return {...state, ...{accessToken:action.accessToken}};
    case SET_MY_TEAMS:
      return {...state, ...{myTeams:action.myTeams}};
      case SELECT_GROUP:
      return {...state, ...{seletedGroup:action.seletedGroup}};
      case SELECT_MEMBER:
      return {...state, ...{seletedMember:action.seletedMember}};
      case SET_MEMBER_NAME_FILTER:
      return {...state, ...{memberNameFilter:action.memberNameFilter}};
    case SET_GROUP_MEMBERS:
      return {...state, ...{membersByGroup: {[action.groupId]:action.groupMembers} }};

    default:
      return state
  }
}

export default reducer;

