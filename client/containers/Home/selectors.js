
/* eslint-disable */

import { createSelector } from 'reselect';
const selectHomeState = () => (state) => state.get('home');

const selectNoteGroups = () => createSelector(
  selectHomeState(),
  (homeState) => homeState.get('noteGroups')
);

const selectNoteGroupModel = () => createSelector(
  selectHomeState(),
  (homeState) => homeState.get('noteGroupModel')
);

const selectGetNoteGroupStatus = () => createSelector(
  selectHomeState(),
  (homeState) => homeState.get('getNoteGroupsStatus')
);


const selectAddNoteGroupStatus = () => createSelector(
  selectHomeState(),
  (homeState) => homeState.get('addNoteGroupStatus')
);


const selectDeleteNoteGroupStatus = () => createSelector(
  selectHomeState(),
  (homeState) => homeState.get('deleteNoteGroupStatus')
);

export {
  selectNoteGroups,
  selectNoteGroupModel,
  selectGetNoteGroupStatus,
  selectAddNoteGroupStatus,
  selectDeleteNoteGroupStatus,
};
