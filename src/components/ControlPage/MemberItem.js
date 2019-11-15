import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'
import {selectMember} from "../../stateHandlers/actions";

class MemberItem_ extends Component {
  render() {
    const selectedGroupClassName = (
      this.props.seletedMember &&
      this.props.seletedMember.id &&
      this.props.seletedMember.id===this.props.member.id
    ) ? 'item-selected' : '';

    return (
      <div className={`app-button teamitem-container ${selectedGroupClassName}`}
           onClick={()=>this.props.selectMember(this.props.member)}
      >
        <div>{this.props.member.displayName}</div>
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
