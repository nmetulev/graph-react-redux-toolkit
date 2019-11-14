import React, { Component } from 'react';
import { connect } from 'react-redux';

import TeamItem from "./TeamItem";
import './styles.css'

class TeamsList_ extends Component {

  render() {
    const teamItems = this.props.myTeams.map(team=>{
      console.log('team:',team);
      return <TeamItem team={team} key={team.id}/>
    });
    return (
      <div className='teamlist-container'>
        <div className='column-title-text'>Teams</div>
        {teamItems}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    myTeams: state.myTeams,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    // fetchMyTeams: () => dispatch(fetchMyTeams()),
  }
};

const TeamsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsList_);

export default TeamsList;
