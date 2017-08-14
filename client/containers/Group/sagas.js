
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
  deleteNoteFail,
  addMediaSuccess,
  addMediaFail,
} from './actions';



function addNOTE(params) {
  return new Promise(function(resolve, reject) {
    Cosmic.addObject(config, params, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
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


function addMEDIA(params) {
  return new Promise(function(resolve, reject) {
    Cosmic.addMedia(config, params, (err, res) => {
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
    yield put(getNotesSuccess(notes.data.objects||[]));
  } catch (err) {
    yield put(getNotesFail(err));
  }

}

export function* addNote(action) {

  const params = {
    write_key: config.bucket.write_key,
    type_slug: "notes",
    title: action.note.title,
    content: action.note.content,
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


  const file1 = yield call(addMedia, action.note.image);
  if(!file1.err && !!file1) {
    yield params.metafields.push({
      key: 'featured_image',
      type: 'file',
      value: file1.file,
      id: file1._id
    });
  }

  const file2 = yield call(addMedia, action.note.file);
  if(!file2.err && !!file2) {
    yield params.metafields.push({
      key: 'attachment',
      type: 'file',
      value: file2.file,
      id: file2._id
    });
  }

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
    content: action.note.content,
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
    slug: action.note.slug,
  };

  if (!!action.note.metafields && !!action.note.metafields[1]) {
    const file1 = yield call(deleteMedia, action.note.metafields[1].id);
  }

  if (!!action.note.metafields && !!action.note.metafields[2]) {
    const file2 = yield call(addMedia, action.note.metafields[2].id);
  }
  const response = yield call(deleteNOTE, params);
  if(!response.err) {
    yield put(deleteNoteSuccess(action.index));
  } else {
    yield put(deleteNoteFail(response.err));
  }

}


export function* deleteMedia(id) {
  const requestURL = `${HOST}/${SLUG}/media/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      write_key: WRITE_KEY,
    })
  };
  try {
    const response = yield call(request, requestURL, options);
    return true;
  } catch (err) {
    return false;
  }
}

function* addMedia(media) {
  if (!!media) {
    const params = {
      media: media,
      folder: "notes-images",
    };
    const response = yield call(addMEDIA, params);
    if(!response.err) {
      return response.body.media;
    } else {
      return response.err;
    }
  } else {
    return false;
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
