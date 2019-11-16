import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css'

class SelectedMember_ extends Component {
  render() {
    console.log('this.props.seletedMember:',this.props.seletedMember);
    return (
      <div className='selected-member-container'>
        <div className='selected-row'>
          <div className='selected-label'>Name:</div>
          <div className='selected-value'>{this.props.seletedMember.displayName}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    seletedMember: state.seletedMember,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    // selectGroup: group => dispatch(selectGroup(group)),
  }
};

const SelectedMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedMember_);

export default SelectedMember;
