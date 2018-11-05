import React, { Component } from 'react'
import AppStack from './Routes';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class RootComponent extends Component {  
  render() {    
    return (
      <AppStack/>      
    );
  }
}


const bindAction = dispatch => {
  return Object.assign({ dispatch }, bindActionCreators(ActionCreators, dispatch));   
};

const mapStateToProps = state => ({  
});  

export default connect(mapStateToProps, bindAction)(RootComponent);
