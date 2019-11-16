import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css'
import ShortListItem from "./ShortListItem";

class MemberShortList_ extends Component {

  render() {
    const memberItems = this.props.memberShortList.map(member=>{
      return <ShortListItem member={member} key={member.id} />
    });
    return (
      <div className='teamlist-container'>
        <div className='column-title-text'>Short List</div>
        {memberItems}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    memberShortList: Object.values(state.memberShortListById),
  }
};

const mapDispatchToProps = dispatch => {
  return{
    // fetchMyTeams: () => dispatch(fetchMyTeams()),
  }
};

const MemberShortList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberShortList_);

export default MemberShortList;
