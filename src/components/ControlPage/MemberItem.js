import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'
import {selectMember, addMemberToShortList, removeMemberFromShortList} from "../../stateHandlers/actions";
import plusImg from "../../images/plus-8x.png";
import minusImg from "../../images/minus.png";

import '@microsoft/mgt/dist/es6/components/mgt-person/mgt-person';


class MemberItem_ extends Component {
  onClickAddShortList(e) {
    e.stopPropagation();
    this.props.addMemberToShortList(this.props.member);
  }

  onClickRemoveShortList(e) {
    e.stopPropagation();
    this.props.removeMemberFromShortList(this.props.member);
  }

  constructor(props) {
    super(props);
    this.onClickAddShortList = this.onClickAddShortList.bind(this);
    this.onClickRemoveShortList = this.onClickRemoveShortList.bind(this);
  }

  render() {
    const selectedGroupClassName = (
      this.props.selectedMember &&
      this.props.selectedMember.id &&
      this.props.selectedMember.id===this.props.member.id
    ) ? 'item-selected' : '';

    const shortListImg = (this.props.memberShortListById[this.props.member.id]) ?
      <img className='item-shortlist-btn'
           src={minusImg}
           alt='Add user to shortlist'
           onClick={this.onClickRemoveShortList}
      /> :
      <img className='item-shortlist-btn'
           src={plusImg}
           alt='Remove user from shortlist'
           onClick={this.onClickAddShortList}
      />;

    return (
      <div className={`app-button member-item-container ${selectedGroupClassName}`}
           onClick={()=>this.props.selectMember(this.props.member)}
      >
        {/* <div>{this.props.member.displayName}</div> */}
        <mgt-person show-name ref="person"></mgt-person>
        {shortListImg}
      </div>
    );
  }

  componentDidMount() {
    this.refs.person.personDetails = this.props.member;
    this.refs.person.personImage = '@';
  }
}

const mapStateToProps = state => {
  return{
    selectedMember: state.selectedMember,
    memberShortListById: state.memberShortListById,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    selectMember: selectedMember => dispatch(selectMember(selectedMember)),
    addMemberToShortList: member => dispatch(addMemberToShortList(member)),
    removeMemberFromShortList: member => dispatch(removeMemberFromShortList(member)),
  }
};

const MemberItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberItem_);

MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
  selectedMember: PropTypes.object
};

export default MemberItem;
