import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'

class MemberItem_ extends Component {
  render() {
    return (
      <div className='app-button teamitem-container'>
        <div>{this.props.member.displayName}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    // myTeams: state.myTeams,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    // fetchMyTeams: () => dispatch(fetchMyTeams()),
  }
};

const MemberItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberItem_);

MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

export default MemberItem;
