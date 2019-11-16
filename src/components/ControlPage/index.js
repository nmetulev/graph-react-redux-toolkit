import React, { Component } from 'react';
import { connect } from 'react-redux';

import TeamsList from "./TeamsList";
import MembersList from "./MembersList";
import SelectedMember from "./SelectedMember";
import MemberShortList from "./MemberShortList";

class MainControlPage_ extends Component {

  render() {
    return (
      <div className='controlpage-container-vert'>
        <div className='controlpage-container-horiz'>
          <TeamsList/>
          {
            this.props.seletedGroup ? <MembersList/> : <div/>
          }
          {
            this.props.hasMemberShortList ? <MemberShortList /> : <div/>
          }
        </div>
        {
          this.props.seletedMember ? <SelectedMember/> : <div/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    myTeams: state.myTeams,
    seletedGroup: state.seletedGroup,
    seletedMember: state.seletedMember,
    hasMemberShortList: Object.values(state.memberShortListById).length>0,
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
