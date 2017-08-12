/* eslint-disable */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';


import {

} from './actions';

import {
  selectNoteGroupModel
} from './selectors';

import Home from '../../components/Home';

export class HomeContainer extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div>
      <Home />
      </div>
    );
  }
}

HomeContainer.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  noteGroupModel: selectNoteGroupModel(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
