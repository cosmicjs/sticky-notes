
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


export function setValue(name, value) {
  return {
    type: SET_VALUE,
    name,
    value,
  };
}

export function getNotes(slug) {
  return {
    type: GET_NOTES,
    slug,
  };
}

export function getNotesSuccess(notes) {
  return {
    type: GET_NOTES_SUCCESS,
    notes
  };
}

export function getNotesFail(error) {
  return {
    type: GET_NOTES_FAIL,
    error,
  };
}


export function addNote(note, id) {
  return {
    type: ADD_NOTE,
    note,
    id,
  };
}

export function addNoteSuccess(note) {
  return {
    type: ADD_NOTE_SUCCESS,
    note
  };
}

export function addNoteFail(error) {
  return {
    type: ADD_NOTE_FAIL,
    error,
  };
}


export function editNote(note, slug, index) {
  return {
    type: EDIT_NOTE,
    note,
    slug,
    index,
  };
}

export function editNoteSuccess(note, index) {
  return {
    type: EDIT_NOTE_SUCCESS,
    note,
    index,
  };
}

export function editNoteFail(error) {
  return {
    type: EDIT_NOTE_FAIL,
    error,
  };
}

export function deleteNote(slug, index) {
  return {
    type: DELETE_NOTE,
    slug,
    index,
  };
}

export function deleteNoteSuccess(index) {
  return {
    type: DELETE_NOTE_SUCCESS,
    index
  };
}

export function deleteNoteFail(error) {
  return {
    type: DELETE_NOTE_FAIL,
    error,
  };
}


export function addMedia(media) {
  return {
    type: ADD_MEDIA,
    media,
  };
}

export function addMediaSuccess(media) {
  return {
    type: ADD_MEDIA_SUCCESS,
    media,
  };
}

export function addMediaFail(error) {
  return {
    type: ADD_MEDIA_FAIL,
    error,
  };
}
