import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'
import {selectMember, addMemberToShortList, removeMemberFromShortList} from "../../stateHandlers/actions";
import plusImg from "../../images/plus-8x.png";
import minusImg from "../../images/minus.png";

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
      this.props.seletedMember &&
      this.props.seletedMember.id &&
      this.props.seletedMember.id===this.props.member.id
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
        <div>{this.props.member.displayName}</div>
        {shortListImg}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    seletedMember: state.seletedMember,
    memberShortListById: state.memberShortListById,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    selectMember: seletedMember => dispatch(selectMember(seletedMember)),
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
  seletedMember: PropTypes.object
};

export default MemberItem;
