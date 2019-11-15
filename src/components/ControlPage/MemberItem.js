import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'
import {selectMember} from "../../stateHandlers/actions";
import plusImg from "../../images/plus-8x.png";

class MemberItem_ extends Component {
  onClickAddShortList(e) {
    e.stopPropagation();
    console.log('click');
  }

  constructor(props) {
    super(props);
    this.onClickAddShortList = this.onClickAddShortList.bind(this);
  }

  render() {
    const selectedGroupClassName = (
      this.props.seletedMember &&
      this.props.seletedMember.id &&
      this.props.seletedMember.id===this.props.member.id
    ) ? 'item-selected' : '';

    return (
      <div className={`app-button member-item-container ${selectedGroupClassName}`}
           onClick={()=>this.props.selectMember(this.props.member)}
      >
        <div>{this.props.member.displayName}</div>
        <img className='item-shortlist-btn'
             src={plusImg}
             alt='Add user to shortlist'
             onClick={this.onClickAddShortList}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    seletedMember: state.seletedMember,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    selectMember: seletedMember => dispatch(selectMember(seletedMember)),
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
