import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {selectGroup} from "../../stateHandlers/actions";
import './styles.css'

class TeamsItem_ extends Component {
  render() {
    const selectedGroupClassName = (
      this.props.seletedGroup &&
      this.props.seletedGroup.id &&
      this.props.seletedGroup.id===this.props.team.id
    ) ? 'group-item-selected' : '';

    return (
      <div className={`app-button teamitem-container ${selectedGroupClassName}`}
           onClick={()=>this.props.selectGroup(this.props.team)}
      >
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
    selectGroup: group => dispatch(selectGroup(group)),
  }
};

const TeamsItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsItem_);

TeamsItem.propTypes = {
  team: PropTypes.object.isRequired,
  seletedGroup: PropTypes.object,
};

export default TeamsItem;
