/* eslint-disable */
import {
  SET_VALUE,
  GET_NOTES,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAIL,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAIL,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  group: {
    getNotesStatus: {
      loading: false,
      loaded: false,
      error: false,
    },
    addNoteStatus: {
      adding: false,
      added: false,
      error: false,
    },
    editNoteStatus: {
      editing: false,
      edited: false,
      error: false,
    },
    deleteNoteStatus: {
      deleting: false,
      deleted: false,
      error: false,
    },
    notes: [],
    noteModel: {},
  }
});

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      return state
        .setIn(action.name, action.value);

    case GET_NOTES:
      return state
        .setIn(['group', 'getNotesStatus', 'loading'], true)
        .setIn(['group', 'getNotesStatus', 'loaded'], false)
        .setIn(['group', 'getNotesStatus', 'error'], false);
    case GET_NOTES_SUCCESS:
      return state
        .setIn(['group', 'getNotesStatus', 'loading'], false)
        .setIn(['group', 'getNotesStatus', 'loaded'], true)
        .setIn(['group', 'getNotesStatus', 'error'], false)
        .setIn(['group', 'notes'], fromJS(action.notes));
    case GET_NOTES_FAIL:
      return state
        .setIn(['group', 'getNotesStatus', 'loading'], false)
        .setIn(['group', 'getNotesStatus', 'loaded'], false)
        .setIn(['group', 'getNotesStatus', 'error'], action.error);

    case ADD_NOTE:
      return state
        .setIn(['group', 'addNoteStatus', 'adding'], true)
        .setIn(['group', 'addNoteStatus', 'added'], false)
        .setIn(['group', 'addNoteStatus', 'error'], false)
        .setIn(['group', 'noteModel'], action.note);
    case ADD_NOTE_SUCCESS:
      return state
        .setIn(['group', 'addNoteStatus', 'adding'], false)
        .setIn(['group', 'addNoteStatus', 'added'], true)
        .setIn(['group', 'addNoteStatus', 'error'], false)
        .updateIn(['group', 'notes'], arr => arr.push(fromJS(action.note)));
    case ADD_NOTE_FAIL:
      return state
        .setIn(['group', 'addNoteStatus', 'adding'], false)
        .setIn(['group', 'addNoteStatus', 'added'], false)
        .setIn(['group', 'addNoteStatus', 'error'], action.error);

    case EDIT_NOTE:
      return state
        .setIn(['group', 'editNoteStatus', 'editing'], true)
        .setIn(['group', 'editNoteStatus', 'edited'], false)
        .setIn(['group', 'editNoteStatus', 'error'], false);
    case EDIT_NOTE_SUCCESS:
      return state
        .setIn(['group', 'editNoteStatus', 'editing'], false)
        .setIn(['group', 'editNoteStatus', 'edited'], true)
        .setIn(['group', 'editNoteStatus', 'error'], false)
        .setIn(['group', 'notes', action.index], fromJS(action.note));
    case EDIT_NOTE_FAIL:
      return state
        .setIn(['group', 'editNoteStatus', 'editing'], false)
        .setIn(['group', 'editNoteStatus', 'edited'], false)
        .setIn(['group', 'editNoteStatus', 'error'], action.error);

    case DELETE_NOTE:
      return state
        .setIn(['group', 'deleteNoteStatus', 'deleting'], true)
        .setIn(['group', 'deleteNoteStatus', 'deleted'], false)
        .setIn(['group', 'deleteNoteStatus', 'error'], false);
    case DELETE_NOTE_SUCCESS:
      return state
        .setIn(['group', 'deleteNoteStatus', 'deleting'], false)
        .setIn(['group', 'deleteNoteStatus', 'deleted'], true)
        .setIn(['group', 'deleteNoteStatus', 'error'], false)
        .deleteIn(['group', 'notes', action.index]);
    case DELETE_NOTE_FAIL:
      return state
        .setIn(['group', 'deleteNoteStatus', 'deleting'], false)
        .setIn(['group', 'deleteNoteStatus', 'deleted'], false)
        .setIn(['group', 'deleteNoteStatus', 'error'], action.error);
    default:
      return state;
  }
}

export default groupReducer;
