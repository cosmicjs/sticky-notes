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
  addMedia,
} from './actions';

import {
  selectNotes,
  selectNoteModel,
  selectGetNotesStatus,
  selectAddNoteStatus,
  selectEditNoteStatus,
  selectDeleteNoteStatus,
  selectAddMediaStatus,
  selectAddedMedia,
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
        notes={this.props.notes}
        groupSlug={this.props.params.groupSlug}
        groupId={this.props.params.groupId}
        addedMedia={this.props.addedMedia}
        addMediaStatus={this.props.addMediaStatus}
        addNoteStatus={this.props.addNoteStatus}

        addNote={this.props.onAddNote}
        editNote={this.props.onEditNote}
        deleteNote={this.props.onDeleteNote}
        addMedia={this.props.onAddMedia}
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
    onAddNote: (note, id) => dispatch(addNote(note, id)),
    onEditNote: (note, slug, index) => dispatch(editNote(note, slug, index)),
    onDeleteNote: (slug, index) => dispatch(deleteNote(slug, index)),
    onAddMedia: (media) => dispatch(addMedia(media)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  notes: selectNotes(),
  noteModel: selectNoteModel(),
  addedMedia: selectAddedMedia(),
  getNotesStatus: selectGetNotesStatus(),
  addNoteStatus: selectAddNoteStatus(),
  editNoteStatus: selectEditNoteStatus(),
  deleteNoteStatus: selectDeleteNoteStatus(),
  addMediaStatus: selectAddMediaStatus(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Container);
