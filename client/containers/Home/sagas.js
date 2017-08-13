
/* eslint-disable */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import Cosmic from 'cosmicjs';
import config from '../../config';

import {
  GET_NOTE_GROUPS,
} from './constants';

import {
  getNoteGroupsSuccess,
  getNoteGroupsFail,
} from './actions';

function* wow(objects) {
  console.log(objects)
  // put(getNoteGroupsSuccess(objects));
}

function getGROUPS(params) {
  return new Promise(function(resolve, reject) {
    Cosmic.getObjectType(config, params, (err, res) => {
      if (!err) {
        // console.log("FETCHED: ", res.objects)
        resolve(res.objects.all);
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
    yield put(getNoteGroupsSuccess(groups));
  } else {
    yield put(getNoteGroupsFail(groups.err));
  }

}

  // yield put(getNoteGroupsSuccess(res.objects.all));


/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* homeSagas() {
  yield fork(takeLatest, GET_NOTE_GROUPS, getNoteGroups);
}

// Bootstrap sagas
export default homeSagas;
