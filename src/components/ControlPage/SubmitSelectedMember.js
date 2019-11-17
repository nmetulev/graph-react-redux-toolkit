import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css'
import {submitMember} from "../../stateHandlers/actions";

class SubmitSelectedMember_ extends Component {
  render() {
    return (
      <button className='send-btn' onClick={()=>this.props.submitMember(this.props.selectedMember)}>
        Send {this.props.selectedMember.displayName}
      </button>
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
    submitMember: member => dispatch(submitMember(member)),
  }
};

const SubmitSelectedMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitSelectedMember_);

export default SubmitSelectedMember;
