import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberItem from "./MemberItem";
import './styles.css'

class MembersList_ extends Component {

  render() {
    const memberItems = this.props.members.map(member=>{
      return <MemberItem member={member} key={member.id}/>
    });
    return (
      <div className='teamlist-container'>
        <div className='column-title-text'>Members</div>
        {memberItems}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let members = [];
  if(state.seletedGroup && state.seletedGroup.id) {
    members = state.membersByGroup[state.seletedGroup.id] || [];
  }
  return{
    members: members,
    seletedGroup: state.seletedGroup,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    // fetchMyTeams: () => dispatch(fetchMyTeams()),
  }
};

const MembersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList_);

export default MembersList;
