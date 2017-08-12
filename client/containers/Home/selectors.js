
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


export {
  selectNoteGroups,
  selectNoteGroupModel,
};
