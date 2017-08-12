
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


export function setValue(name, value) {
  return {
    type: SET_VALUE,
    name,
    value,
  };
}

export function getNoteGroups() {
  return {
    type: GET_NOTE_GROUPS,
  };
}

export function getNoteGroupsSuccess(groups) {
  return {
    type: GET_NOTE_GROUPS_SUCCESS,
    groups
  };
}

export function getNoteGroupsFail(error) {
  return {
    type: GET_NOTE_GROUPS_FAIL,
    error,
  };
}


export function addNoteGroup(group) {
  return {
    type: ADD_NOTE_GROUP,
    group,
  };
}

export function addNoteGroupSuccess(group) {
  return {
    type: ADD_NOTE_GROUP_SUCCESS,
    group
  };
}

export function addNoteGroupFail(error) {
  return {
    type: ADD_NOTE_GROUP_FAIL,
    error,
  };
}


export function deleteNoteGroup(slug, index) {
  return {
    type: DELETE_NOTE_GROUP,
    slug,
    index,
  };
}

export function deleteNoteGroupSuccess(index) {
  return {
    type: DELETE_NOTE_GROUP_SUCCESS,
    index
  };
}

export function deleteNoteGroupFail(error) {
  return {
    type: DELETE_NOTE_GROUP_FAIL,
    error,
  };
}
