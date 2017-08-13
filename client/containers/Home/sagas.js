
/* eslint-disable */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import Cosmic from 'cosmicjs';
import config from '../../config';

import {
  GET_NOTE_GROUPS,
  ADD_NOTE_GROUP,
  DELETE_NOTE_GROUP,
} from './constants';

import {
  getNoteGroupsSuccess,
  getNoteGroupsFail,
  addNoteGroupSuccess,
  addNoteGroupFail,
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

function addGROUP(params) {
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

export function* getNoteGroups() {
  const params = {
    type_slug: 'groups',
  };
  const groups = yield call(getGROUPS, params);
  if(!groups.err) {
    yield put(getNoteGroupsSuccess(groups));
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
    yield put(addNoteGroupFail(response.err));
  }
}

export function* deleteNoteGroup(action) {
  const params = {
    write_key: config.bucket.write_key,
    slug: action.slug,
  };
  const response = yield call(deleteGROUP, params);
  if(!response.err) {
    console.log(response)
    yield put(deleteNoteGroupSuccess(action.index));
  } else {
    yield put(deleteNoteGroupFail(response.err));
  }

}
  // yield put(getNoteGroupsSuccess(res.objects.all));


/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* homeSagas() {
  yield fork(takeLatest, GET_NOTE_GROUPS, getNoteGroups);
  yield fork(takeLatest, ADD_NOTE_GROUP, addNoteGroup);
  yield fork(takeLatest, DELETE_NOTE_GROUP, deleteNoteGroup);
}

// Bootstrap sagas
export default homeSagas;
