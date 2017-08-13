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
  getNoteGroups,
} from './actions';

import {
  selectNoteGroups,
  selectNoteGroupModel,
} from './selectors';

import Home from '../../components/Home';

export class HomeContainer extends React.Component {
  constructor(props){
    super(props);

  }


  componentWillMount() {
    this.props.onGetNoteGroups();
  }
  render() {
    console.log("NOTES: ",this.props.noteGroups.toJS())

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
    onGetNoteGroups: () => dispatch(getNoteGroups()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  noteGroups: selectNoteGroups(),
  noteGroupModel: selectNoteGroupModel(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
