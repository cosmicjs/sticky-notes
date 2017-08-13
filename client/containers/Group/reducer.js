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
  ADD_MEDIA,
  ADD_MEDIA_SUCCESS,
  ADD_MEDIA_FAIL,
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
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
  addMediaStatus: {
    adding: false,
    added: false,
    error: false,
  },
  notes: [],
  noteModel: {},
});

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      return state
        .setIn(action.name, action.value);

    case GET_NOTES:
      return state
        .setIn(['getNotesStatus', 'loading'], true)
        .setIn(['getNotesStatus', 'loaded'], false)
        .setIn(['getNotesStatus', 'error'], false);
    case GET_NOTES_SUCCESS:
      return state
        .setIn(['getNotesStatus', 'loading'], false)
        .setIn(['getNotesStatus', 'loaded'], true)
        .setIn(['getNotesStatus', 'error'], false)
        .setIn(['notes'], fromJS(action.notes));
    case GET_NOTES_FAIL:
      return state
        .setIn(['getNotesStatus', 'loading'], false)
        .setIn(['getNotesStatus', 'loaded'], false)
        .setIn(['getNotesStatus', 'error'], action.error);

    case ADD_NOTE:
      return state
        .setIn(['addNoteStatus', 'adding'], true)
        .setIn(['addNoteStatus', 'added'], false)
        .setIn(['addNoteStatus', 'error'], false)
        .setIn(['noteModel'], action.note);
    case ADD_NOTE_SUCCESS:
      return state
        .setIn(['addNoteStatus', 'adding'], false)
        .setIn(['addNoteStatus', 'added'], true)
        .setIn(['addNoteStatus', 'error'], false)
        .updateIn(['notes'], arr => {
          console.log("ARR: ",arr);
          return arr.push(fromJS(action.note));
        });
    case ADD_NOTE_FAIL:
      return state
        .setIn(['addNoteStatus', 'adding'], false)
        .setIn(['addNoteStatus', 'added'], false)
        .setIn(['addNoteStatus', 'error'], action.error);

    case EDIT_NOTE:
      return state
        .setIn(['editNoteStatus', 'editing'], true)
        .setIn(['editNoteStatus', 'edited'], false)
        .setIn(['editNoteStatus', 'error'], false);
    case EDIT_NOTE_SUCCESS:
      return state
        .setIn(['editNoteStatus', 'editing'], false)
        .setIn(['editNoteStatus', 'edited'], true)
        .setIn(['editNoteStatus', 'error'], false)
        .setIn(['notes', action.index], fromJS(action.note));
    case EDIT_NOTE_FAIL:
      return state
        .setIn(['editNoteStatus', 'editing'], false)
        .setIn(['editNoteStatus', 'edited'], false)
        .setIn(['editNoteStatus', 'error'], action.error);

    case DELETE_NOTE:
      return state
        .setIn(['deleteNoteStatus', 'deleting'], true)
        .setIn(['deleteNoteStatus', 'deleted'], false)
        .setIn(['deleteNoteStatus', 'error'], false);
    case DELETE_NOTE_SUCCESS:
      return state
        .setIn(['deleteNoteStatus', 'deleting'], false)
        .setIn(['deleteNoteStatus', 'deleted'], true)
        .setIn(['deleteNoteStatus', 'error'], false)
        .deleteIn(['notes', action.index]);
    case DELETE_NOTE_FAIL:
      return state
        .setIn(['deleteNoteStatus', 'deleting'], false)
        .setIn(['deleteNoteStatus', 'deleted'], false)
        .setIn(['deleteNoteStatus', 'error'], action.error);

    case ADD_MEDIA:
      return state
        .setIn(['addMediaStatus', 'adding'], true)
        .setIn(['addMediaStatus', 'added'], false)
        .setIn(['addMediaStatus', 'error'], false);
    case ADD_MEDIA_SUCCESS:
      return state
        .setIn(['addMediaStatus', 'adding'], false)
        .setIn(['addMediaStatus', 'added'], true)
        .setIn(['addMediaStatus', 'error'], false);
    case ADD_MEDIA_FAIL:
      return state
        .setIn(['addMediaStatus', 'adding'], false)
        .setIn(['addMediaStatus', 'added'], false)
        .setIn(['addMediaStatus', 'error'], action.error);
    default:
      return state;
  }
}

export default groupReducer;
