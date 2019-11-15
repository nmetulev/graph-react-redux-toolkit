import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberItem from "./MemberItem";
import {setMemberNameFilter} from "../../stateHandlers/actions";
import './styles.css'
import searchImg from '../../images/eye-8x.png';

class MembersList_ extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event) {
    this.props.setMemberNameFilter(event.target.value);
  }

  render() {
    const memberItems = this.props.members.map(member=>{
      if(member.displayName.toLowerCase().includes(this.props.memberNameFilter.toLowerCase())) {
        return <MemberItem member={member} key={member.id}/>
      } else {
        return <div/>
      }
    });
    return (
      <div className='teamlist-container'>
        <div className='column-title-text'>Members</div>
        <div className='filter-container'>
          <img src={searchImg} alt='Filter Members'/>
          <input type="text" value={this.props.memberNameFilter}
                 onChange={this.handleFilterChange}
                 placeholder='Filter'
                 className='filter-input'
          />
        </div>
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
    memberNameFilter: state.memberNameFilter
  }
};

const mapDispatchToProps = dispatch => {
  return{
    setMemberNameFilter: nameFilter => dispatch(setMemberNameFilter(nameFilter)),
  }
};

const MembersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList_);

export default MembersList;
