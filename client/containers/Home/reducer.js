/* eslint-disable */
import {
  SET_VALUE,
  GET_NOTE_GROUPS,
  GET_NOTE_GROUPS_SUCCESS,
  GET_NOTE_GROUPS_FAIL,
  ADD_NOTE_GROUP,
  ADD_NOTE_GROUP_SUCCESS,
  ADD_NOTE_GROUP_FAIL,
  DELETE_NOTE_GROUP,
  DELETE_NOTE_GROUP_SUCCESS,
  DELETE_NOTE_GROUP_FAIL,
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  getNoteGroupsStatus: {
    loading: false,
    loaded: false,
    error: false,
  },
  addNoteGroupStatus: {
    adding: false,
    added: false,
    error: false,
  },
  deleteNoteGroupStatus: {
    deleting: false,
    deleted: false,
    error: false,
  },
  noteGroups: [],
  noteGroupModel: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      return state
        .setIn(action.name, action.value);

    case GET_NOTE_GROUPS:
      return state
        .setIn(['getNoteGroupsStatus', 'loading'], true)
        .setIn(['getNoteGroupsStatus', 'loaded'], false)
        .setIn(['getNoteGroupsStatus', 'error'], false);
    case GET_NOTE_GROUPS_SUCCES:
      return state
        .setIn(['getNoteGroupsStatus', 'loading'], false)
        .setIn(['getNoteGroupsStatus', 'loaded'], true)
        .setIn(['getNoteGroupsStatus', 'error'], false)
        .set('noteGroups', fromJS(action.groups));
    case GET_NOTE_GROUPS_FAIL:
      return state
        .setIn(['getNoteGroupsStatus', 'loading'], false)
        .setIn(['getNoteGroupsStatus', 'loaded'], false)
        .setIn(['getNoteGroupsStatus', 'error'], action.error);

    case ADD_NOTE_GROUP:
      return state
        .setIn(['addNoteGroupStatus', 'adding'], true)
        .setIn(['addNoteGroupStatus', 'added'], false)
        .setIn(['addNoteGroupStatus', 'error'], false)
        .set('noteGroupModel', action.group);
    case ADD_NOTE_GROUP_SUCCES:
      return state
        .setIn(['addNoteGroupStatus', 'adding'], false)
        .setIn(['addNoteGroupStatus', 'added'], true)
        .setIn(['addNoteGroupStatus', 'error'], false)
        .update('noteGroups', arr => arr.push(fromJS(action.group)));

    case ADD_NOTE_GROUP_FAIL:
      return state
        .setIn(['addNoteGroupStatus', 'adding'], false)
        .setIn(['addNoteGroupStatus', 'added'], false)
        .setIn(['addNoteGroupStatus', 'error'], action.error);

    case DELETE_NOTE_GROUP:
      return state
        .setIn(['deleteNoteGroupStatus', 'deleting'], true)
        .setIn(['deleteNoteGroupStatus', 'deleted'], false)
        .setIn(['deleteNoteGroupStatus', 'error'], false);
    case DELETE_NOTE_GROUP_SUCCES:
      return state
        .setIn(['deleteNoteGroupStatus', 'deleting'], false)
        .setIn(['deleteNoteGroupStatus', 'deleted'], true)
        .setIn(['deleteNoteGroupStatus', 'error'], false)
        .deleteIn(['noteGroups', action.index]);
    case DELETE_NOTE_GROUP_FAIL:
      return state
        .setIn(['deleteNoteGroupStatus', 'deleting'], false)
        .setIn(['deleteNoteGroupStatus', 'deleted'], false)
        .setIn(['deleteNoteGroupStatus', 'error'], action.error);
    default:
      return state;
  }
}

export default homeReducer;
