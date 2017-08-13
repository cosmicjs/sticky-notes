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
  getNotes,
  editNote,
  deleteNote,
  addNote,
} from './actions';

import {
  selectNotes,
  selectNoteModel,
  selectGetNotesStatus,
  selectAddNoteStatus,
  selectEditNoteStatus,
  selectDeleteNoteStatus,
} from './selectors';

import Group from '../../components/Group';

export class Container extends React.Component {

  componentWillMount() {
    const { groupSlug } = this.props.params;
    this.props.onGetNotes(groupSlug);
  }

  render() {
    return (
      <div>
      <Group
        groupSlug={this.props.params.groupSlug}
      />
      </div>
    );
  }
}

Container.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    onGetNotes: (slug) => dispatch(getNotes(slug)),
    onAddNote: (group) => dispatch(addNote(group)),
    onEditNote: (group, slug, index) => dispatch(editNote(group, slug, index)),
    onDeleteNote: (slug, index) => dispatch(deleteNote(slug, index)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  notes: selectNotes(),
  noteModel: selectNoteModel(),
  getNotesStatus: selectGetNotesStatus(),
  addNoteStatus: selectAddNoteStatus(),
  editNoteStatus: selectEditNoteStatus(),
  deleteNoteStatus: selectDeleteNoteStatus(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Container);
