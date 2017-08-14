
/* eslint-disable */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import Cosmic from 'cosmicjs';
import config from '../../config';

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

function getGROUPS(params) {
  return new Promise(function(resolve, reject) {
    Cosmic.getObjectType(config, params, (err, res) => {
      if (!err) {
        resolve(res.objects.all);
      } else {
        reject(err);
      }
    });
  });

}

function addGROUP(params) {
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

function editGroup(params) {
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

function deleteGROUP(params) {
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
export function* getNoteGroups() {
  const params = {
    type_slug: 'groups',
  };
  const groups = yield call(getGROUPS, params);
  if(!groups.err) {
    console.log("GROUPS: ", groups)
    yield put(getNoteGroupsSuccess(groups||[]));
  } else {
    yield put(getNoteGroupsFail(groups.err));
  }

}

export function* addNoteGroup(action) {
  const params = {
    write_key: config.bucket.write_key,
    type_slug: "groups",
    title: action.group.title,
  };
  const group = yield call(addGROUP, params);
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
  };
  const group = yield call(editGroup, params);
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
  const response = yield call(deleteGROUP, params);
  if(!response.err) {
    console.log(response)
    yield put(deleteNoteGroupSuccess(action.index));
  } else {
    yield put(deleteNoteGroupFail(response.err));
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
