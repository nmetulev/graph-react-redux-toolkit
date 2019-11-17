import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'
import {removeMemberFromShortList, selectMember} from "../../stateHandlers/actions";

class ShortListItem_ extends Component {
  render() {
    const selectedGroupClassName = (
      this.props.selectedMember &&
      this.props.selectedMember.id &&
      this.props.selectedMember.id===this.props.member.id
    ) ? 'item-selected' : '';
    return (
      <div className={`app-button member-item-container ${selectedGroupClassName}`}
           onClick={()=>this.props.selectMember(this.props.member)}
      >
        <div>{this.props.member.displayName}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    selectedMember: state.selectedMember
  }
};

const mapDispatchToProps = dispatch => {
  return{
    selectMember: selectedMember => dispatch(selectMember(selectedMember)),
    removeMemberFromShortList: member => dispatch(removeMemberFromShortList(member)),
  }
};

const ShortListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortListItem_);

ShortListItem.propTypes = {
  member: PropTypes.object.isRequired
};

export default ShortListItem;
