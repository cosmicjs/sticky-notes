
/* eslint-disable */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import Cosmic from 'cosmicjs';
import config from '../../config';

const READ_KEY = config.bucket.read_key;
const WRITE_KEY = config.bucket.write_key;
const SLUG = config.bucket.slug;
const HOST = 'https://api.cosmicjs.com/v1';

import request from '../../utils/request';
import {
  GET_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
} from './constants';

import {
  getNotesSuccess,
  getNotesFail,
  addNoteSuccess,
  addNoteFail,
  editNoteSuccess,
  editNoteFail,
  deleteNoteSuccess,
  deleteNoteFail
} from './actions';



function addNOTE(params) {
  return new Promise(function(resolve, reject) {
    Cosmic.addObject(config, params, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        console.log(err)
        reject(err);
      }
    });
  });
}

function editNOTE(params) {
  return new Promise(function(resolve, reject) {
    Cosmic.editObject(config, params, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        console.log(err)
        reject(err);
      }
    });
  });
}

function deleteNOTE(params) {
  return new Promise(function(resolve, reject) {
    Cosmic.deleteObject(config, params, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
}

export function* getNotes(action) {
  const requestURL = `${HOST}/${SLUG}/object-type/notes/search?metafield_key=group&metafield_object_slug=${action.slug}&read_key=${READ_KEY}`;
  try {
    const notes = yield call(request, requestURL);
    console.log(notes)
    yield put(getNotesSuccess(notes.data.objects));
  } catch (err) {
    yield put(getNotesFail(err));
  }

}

export function* addNote(action) {
  const params = {
    write_key: config.bucket.write_key,
    type_slug: "notes",
    title: action.note.title,
    metafields: [{
      object_type: "groups",
      value: action.id,
      key: "group",
      title: "Group",
      type: "object",
      children: false,
      has_length_edit: false,
      parent: false,
      object: true,
      is_object: true,
    }]
  };
  const note = yield call(addNOTE, params);
  if(!note.err) {
    yield put(addNoteSuccess(note.object));
  } else {
    yield put(addNoteFail(note.err));
  }
}

export function* editNote(action) {
  const params = {
    write_key: config.bucket.write_key,
    type_slug: "groups",
    slug: action.slug,
    title: action.note.title,
  };
  const note = yield call(editNOTE, params);
  if(!note.err) {
    yield put(editNoteSuccess(note.object, action.index));
  } else {
    yield put(editNoteFail(note.err));
  }
}

export function* deleteNote(action) {
  const params = {
    write_key: config.bucket.write_key,
    slug: action.slug,
  };
  const response = yield call(deleteNOTE, params);
  if(!response.err) {
    yield put(deleteNoteSuccess(action.index));
  } else {
    yield put(deleteNoteFail(response.err));
  }

}


/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* homeSagas() {
  yield fork(takeLatest, GET_NOTES, getNotes);
  yield fork(takeLatest, ADD_NOTE, addNote);
  yield fork(takeLatest, EDIT_NOTE, editNote);
  yield fork(takeLatest, DELETE_NOTE, deleteNote);
}

// Bootstrap sagas
export default homeSagas;
