import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css'

class SubmitSelectedMember_ extends Component {
  render() {
    return (
      <button className='send-btn'>Send {this.props.selectedMember.displayName}</button>
    );
  }
}

const mapStateToProps = state => {
  return{
    selectedMember: state.selectedMember,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    // selectGroup: group => dispatch(selectGroup(group)),
  }
};

const SubmitSelectedMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitSelectedMember_);

export default SubmitSelectedMember;
