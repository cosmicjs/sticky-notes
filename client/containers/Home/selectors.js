
/* eslint-disable */

import { createSelector } from 'reselect';
const selectHomeState = () => (state) => state.get('home');

const selectNoteGroupModel = () => createSelector(
  selectHomeState(),
  (homeState) => homeState.get('noteGroupModel')
);


export {
  selectNoteGroupModel,
};
