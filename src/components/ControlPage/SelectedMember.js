import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css'

class SelectedMember_ extends Component {
  render() {
    return (
      <table className='selected-member-container'>
        <tbody>
          <tr>
            <td className='selected-label'>Name:</td>
            <td className='selected-value' >{this.props.seletedMember.displayName}</td>
          </tr>
          <tr>
            <td className='selected-label'>Email:</td>
            <td className='selected-value' >{this.props.seletedMember.mail}</td>
          </tr>
          <tr>
            <td className='selected-label'>Title:</td>
            <td className='selected-value' >{this.props.seletedMember.jobTitle}</td>
          </tr>
          <tr>
            <td className='selected-label'>Phone:</td>
            <td className='selected-value' >{this.props.seletedMember.mobilePhone}</td>
          </tr>
          <tr>
            <td className='selected-label'>Location:</td>
            <td className='selected-value' >{this.props.seletedMember.officeLocation}</td>
          </tr>
        </tbody>
      </table>
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
