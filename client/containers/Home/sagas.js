
/* eslint-disable */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import Cosmic from 'cosmicjs';
import async from 'async';
import config from '../../config';
import request from '../../utils/request';
import cosmic from '../../utils/cosmic';

const READ_KEY = config.bucket.read_key;
const WRITE_KEY = config.bucket.write_key;
const SLUG = config.bucket.slug;
const HOST = 'https://api.cosmicjs.com/v1';

import {
  GET_NOTE_GROUPS,
  ADD_NOTE_GROUP,
  EDIT_NOTE_GROUP,
  DELETE_NOTE_GROUP,
} from './constants';

import {
  getNoteGroupsSuccess,
  getNoteGroupsFail,
  addNoteGroupSuccess,
  addNoteGroupFail,
  editNoteGroupSuccess,
  editNoteGroupFail,
  deleteNoteGroupSuccess,
  deleteNoteGroupFail
} from './actions';


export function* getNoteGroups() {
  const params = {
    type_slug: 'groups',
  };
  try {
    const groups = yield call(cosmic, "GET_TYPE",params);
    yield put(getNoteGroupsSuccess(groups||[]));
  } catch(err) {
    yield put(getNoteGroupsFail(groups.err));
  }

}

export function* addNoteGroup(action) {
  const params = {
    write_key: config.bucket.write_key,
    type_slug: "groups",
    title: action.group.title,
    content: action.group.content,
    metafields: [{
      value: action.group.color,
      key: "color",
      title: "Color",
    }],
  };
  const group = yield call(cosmic, "ADD", params);
  if(!group.err) {
    yield put(addNoteGroupSuccess(group.object));
  } else {
    yield put(addNoteGroupFail(group.err));
  }
}

export function* editNoteGroup(action) {
  const params = {
    write_key: config.bucket.write_key,
    type_slug: "groups",
    slug: action.slug,
    title: action.group.title,
    content: action.group.content,
    metafields: [{
      value: action.group.color,
      key: "color",
      title: "Color",
    }]
  };
  const group = yield call(cosmic, "EDIT", params);
  if(!group.err) {
    yield put(editNoteGroupSuccess(group.object, action.index));
  } else {
    yield put(editNoteGroupFail(group.err));
  }
}

export function* deleteNoteGroup(action) {
  const params = {
    write_key: config.bucket.write_key,
    slug: action.group.slug,
  };

  const notes = yield call(getNotes, action.group.slug);
  async.eachSeries(notes, (note, callback) => {
    const params = {
      write_key: config.bucket.write_key,
      slug: note.slug,
    };
    if (!!note.metafields && !!note.metafields[1]) {
      deleteMedia(note.metafields[1].id);
    }

    if (!!note.metafields && !!note.metafields[2]) {
      deleteMedia(note.metafields[2].id);
    }
    Cosmic.deleteObject(config, params, (err, res)=> {
      callback();
    })
  });
  const response = yield call(cosmic, "DELETE", params);
  if(!response.err) {
    yield put(deleteNoteGroupSuccess(action.index));
  } else {
    yield put(deleteNoteGroupFail(response.err));
  }

}

function deleteMedia(id) {
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
  request(requestURL, options);
}
function* getNotes(slug) {
  const requestURL = `${HOST}/${SLUG}/object-type/notes/search?metafield_key=group&metafield_object_slug=${slug}&read_key=${READ_KEY}`;
  try {
    const notes = yield call(request, requestURL);
    return notes.data.objects||[];
  } catch (err) {
    return err
  }
}

/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* homeSagas() {
  yield fork(takeLatest, GET_NOTE_GROUPS, getNoteGroups);
  yield fork(takeLatest, ADD_NOTE_GROUP, addNoteGroup);
  yield fork(takeLatest, EDIT_NOTE_GROUP, editNoteGroup);
  yield fork(takeLatest, DELETE_NOTE_GROUP, deleteNoteGroup);
}

// Bootstrap sagas
export default homeSagas;
