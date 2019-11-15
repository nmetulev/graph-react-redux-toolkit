import {
  SET_ACCESS_TOKEN,
  SET_ACCOUNT,
  SET_MY_TEAMS,
  SET_GROUP_MEMBERS, SELECT_GROUP, SELECT_MEMBER, SET_MEMBER_NAME_FILTER,
} from "./actionTypes";
import {setAccessTokenApi, fetchMyTeamsApi, fetchGroupMembersApi} from './api';

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

export function selectGroup(seletedGroup) {
  return {
    type: SELECT_GROUP,
    seletedGroup: seletedGroup,
  }
}
export function selectMember(seletedMember) {
  return {
    type: SELECT_MEMBER,
    seletedMember: seletedMember,
  }
}
export function setMemberNameFilter(memberNameFilter) {
  return {
    type: SET_MEMBER_NAME_FILTER,
    memberNameFilter: memberNameFilter,
  }
}

function setGroupMembers(groupId, groupMembers) {
  return {
    type: SET_GROUP_MEMBERS,
    groupId: groupId,
    groupMembers: groupMembers,
  }
}

export function fetchMyTeams() {
  return _apiCall({
    apiFunc: fetchMyTeamsApi,
    apiFuncParam: [],
    rcvdFunc: setMyTeams,
  });
}

export function fetchGroupMembers(groupId) {
  return _apiCall({
    apiFunc: fetchGroupMembersApi,
    apiFuncParam: [groupId],
    rcvdFunc: groupMembers=>dispatch=>dispatch(setGroupMembers(groupId, groupMembers)),
  });
}

export function loadAllData() {
  return (dispatch, getState) => {

    return dispatch(fetchMyTeams())
      .then(async ()=>{
        const state = getState();
        const myTeams = state.myTeams;
        const promises = myTeams.map(async team=>await dispatch(fetchGroupMembers(team.id)).catch(e=>console.error('error:',e)));
        return Promise.all(promises);
      })
      .catch((error)=>{
        console.error('loadAllData error:',error);
      })
      ;
  };
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
