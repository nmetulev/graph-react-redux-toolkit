import React, { Component } from 'react';
import { connect } from 'react-redux';

import TeamsList from "./TeamsList";
import MembersList from "./MembersList";

class MainControlPage_ extends Component {

  render() {
    return (
      <div className='controlpage-container'>
        <TeamsList/>
        {
          this.props.seletedGroup ? <MembersList/> : <div/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    myTeams: state.myTeams,
    seletedGroup: state.seletedGroup,
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
