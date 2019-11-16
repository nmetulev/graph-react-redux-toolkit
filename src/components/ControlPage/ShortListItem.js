import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'
import {removeMemberFromShortList} from "../../stateHandlers/actions";

class ShortListItem_ extends Component {
  render() {
    return (
      <div className='app-button member-item-container'>
        <div>{this.props.member.displayName}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
  }
};

const mapDispatchToProps = dispatch => {
  return{
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
