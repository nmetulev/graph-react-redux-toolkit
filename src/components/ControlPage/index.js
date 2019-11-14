import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchMyTeams,
} from "../../stateHandlers/actions";

class MainControlPage_ extends Component {

  render() {
    return (
      <div>
        Many Teams: {this.props.myTeams.length}
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
    fetchMyTeams: () => dispatch(fetchMyTeams()),
  }
};

const Index = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainControlPage_);

export default Index;
