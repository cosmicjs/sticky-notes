/* eslint-disable */
import {
  SET_VALUE,
  GET_NOTE_GROUPS,
  GET_NOTE_GROUPS_SUCCESS,
  GET_NOTE_GROUPS_FAIL,
  ADD_NOTE_GROUP,
  ADD_NOTE_GROUP_SUCCESS,
  ADD_NOTE_GROUP_FAIL,
  EDIT_NOTE_GROUP,
  EDIT_NOTE_GROUP_SUCCESS,
  EDIT_NOTE_GROUP_FAIL,
  DELETE_NOTE_GROUP,
  DELETE_NOTE_GROUP_SUCCESS,
  DELETE_NOTE_GROUP_FAIL,
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  home: {
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
    editNoteGroupStatus: {
      editing: false,
      edited: false,
      error: false,
    },
    deleteNoteGroupStatus: {
      deleting: false,
      deleted: false,
      error: false,
    },
    noteGroups: [],
    noteGroupModel: {},
  }
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      return state
        .setIn(action.name, action.value);

    case GET_NOTE_GROUPS:
      return state
        .setIn(['home', 'getNoteGroupsStatus', 'loading'], true)
        .setIn(['home', 'getNoteGroupsStatus', 'loaded'], false)
        .setIn(['home', 'getNoteGroupsStatus', 'error'], false);
    case GET_NOTE_GROUPS_SUCCESS:
      return state
        .setIn(['home', 'getNoteGroupsStatus', 'loading'], false)
        .setIn(['home', 'getNoteGroupsStatus', 'loaded'], true)
        .setIn(['home', 'getNoteGroupsStatus', 'error'], false)
        .setIn(['home', 'noteGroups'], fromJS(action.groups));
    case GET_NOTE_GROUPS_FAIL:
      return state
        .setIn(['home', 'getNoteGroupsStatus', 'loading'], false)
        .setIn(['home', 'getNoteGroupsStatus', 'loaded'], false)
        .setIn(['home', 'getNoteGroupsStatus', 'error'], action.error);

    case ADD_NOTE_GROUP:
      return state
        .setIn(['home', 'addNoteGroupStatus', 'adding'], true)
        .setIn(['home', 'addNoteGroupStatus', 'added'], false)
        .setIn(['home', 'addNoteGroupStatus', 'error'], false)
        .setIn(['home', 'noteGroupModel'], action.group);
    case ADD_NOTE_GROUP_SUCCESS:
      return state
        .setIn(['home', 'addNoteGroupStatus', 'adding'], false)
        .setIn(['home', 'addNoteGroupStatus', 'added'], true)
        .setIn(['home', 'addNoteGroupStatus', 'error'], false)
        .updateIn(['home', 'noteGroups'], arr => arr.push(fromJS(action.group)));
    case ADD_NOTE_GROUP_FAIL:
      return state
        .setIn(['home', 'addNoteGroupStatus', 'adding'], false)
        .setIn(['home', 'addNoteGroupStatus', 'added'], false)
        .setIn(['home', 'addNoteGroupStatus', 'error'], action.error);

    case EDIT_NOTE_GROUP:
      return state
        .setIn(['home', 'editNoteGroupStatus', 'editing'], true)
        .setIn(['home', 'editNoteGroupStatus', 'edited'], false)
        .setIn(['home', 'editNoteGroupStatus', 'error'], false);
    case EDIT_NOTE_GROUP_SUCCESS:
      return state
        .setIn(['home', 'editNoteGroupStatus', 'editing'], false)
        .setIn(['home', 'editNoteGroupStatus', 'edited'], true)
        .setIn(['home', 'editNoteGroupStatus', 'error'], false)
        .setIn(['home', 'noteGroups', action.index], fromJS(action.group));
    case EDIT_NOTE_GROUP_FAIL:
      return state
        .setIn(['home', 'editNoteGroupStatus', 'editing'], false)
        .setIn(['home', 'editNoteGroupStatus', 'edited'], false)
        .setIn(['home', 'editNoteGroupStatus', 'error'], action.error);

    case DELETE_NOTE_GROUP:
      return state
        .setIn(['home', 'deleteNoteGroupStatus', 'deleting'], true)
        .setIn(['home', 'deleteNoteGroupStatus', 'deleted'], false)
        .setIn(['home', 'deleteNoteGroupStatus', 'error'], false);
    case DELETE_NOTE_GROUP_SUCCESS:
      return state
        .setIn(['home', 'deleteNoteGroupStatus', 'deleting'], false)
        .setIn(['home', 'deleteNoteGroupStatus', 'deleted'], true)
        .setIn(['home', 'deleteNoteGroupStatus', 'error'], false)
        .deleteIn(['home', 'noteGroups', action.index]);
    case DELETE_NOTE_GROUP_FAIL:
      return state
        .setIn(['home', 'deleteNoteGroupStatus', 'deleting'], false)
        .setIn(['home', 'deleteNoteGroupStatus', 'deleted'], false)
        .setIn(['home', 'deleteNoteGroupStatus', 'error'], action.error);
    default:
      return state;
  }
}

export default homeReducer;
