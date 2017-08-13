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
  editNoteGroup,
  deleteNoteGroup,
  addNoteGroup,
} from './actions';

import {
  selectNoteGroups,
  selectNoteGroupModel,
  selectGetNoteGroupStatus,
  selectAddNoteGroupStatus,
  selectEditNoteGroupStatus,
  selectDeleteNoteGroupStatus,
} from './selectors';

import Home from '../../components/Home';

export class HomeContainer extends React.Component {

  componentWillMount() {
    this.props.onGetNoteGroups();
  }

  render() {
    return (
      <div>
      <Home
        groups={this.props.noteGroups}

        addGroup={this.props.onAddNoteGroup}
        editGroup={this.props.onEditNoteGroup}
        deleteGroup={this.props.onDeleteNoteGroup}
      />
      </div>
    );
  }
}

HomeContainer.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    onGetNoteGroups: () => dispatch(getNoteGroups()),
    onAddNoteGroup: (group) => dispatch(addNoteGroup(group)),
    onEditNoteGroup: (group, slug, index) => dispatch(editNoteGroup(group, slug, index)),
    onDeleteNoteGroup: (slug, index) => dispatch(deleteNoteGroup(slug, index)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  noteGroups: selectNoteGroups(),
  noteGroupModel: selectNoteGroupModel(),
  getNoteGroupsStatus: selectGetNoteGroupStatus(),
  addNoteGroupStatus: selectAddNoteGroupStatus(),
  editNoteGroupStatus: selectEditNoteGroupStatus(),
  deleteNoteGroupStatus: selectDeleteNoteGroupStatus(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
