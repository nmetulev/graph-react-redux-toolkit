import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css'

class TeamsItem_ extends Component {
  render() {
    return (
      <div className='app-button teamitem-container'>
        <div>{this.props.team.displayName}</div>
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

const TeamsItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsItem_);

TeamsItem.propTypes = {
  team: PropTypes.object.isRequired,
};

export default TeamsItem;
