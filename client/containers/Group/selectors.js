
/* eslint-disable */

import { createSelector } from 'reselect';
const selectGroupState = () => (state) => state.group;

const selectNotes = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('notes')
);

const selectNoteModel = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('noteModel')
);

const selectGetNotesStatus = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('getNotesStatus')
);


const selectAddNoteStatus = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('addNoteStatus')
);

const selectEditNoteStatus = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('editNoteStatus')
);

const selectDeleteNoteStatus = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('deleteNoteStatus')
);

const selectAddMediaStatus = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('addMediaStatus')
);


const selectAddedMedia = () => createSelector(
  selectGroupState(),
  (groupState) => groupState.get('addedMedia')
);
export {
  selectNotes,
  selectNoteModel,
  selectGetNotesStatus,
  selectAddNoteStatus,
  selectEditNoteStatus,
  selectDeleteNoteStatus,
  selectAddMediaStatus,
  selectAddedMedia,
};
