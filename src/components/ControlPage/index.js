import React, { Component } from 'react';
import { connect } from 'react-redux';

import TeamsList from "./TeamsList";

class MainControlPage_ extends Component {

  render() {
    return (
      <div className='controlpage-container'>
        <TeamsList/>
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

const Index = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainControlPage_);

export default Index;
