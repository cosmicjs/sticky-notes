
/* eslint-disable */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
// import 'whatwg-fetch';

// import request from 'utils/request';

import {
  GET_NOTE_GROUPS,
} from './constants';


export function* getNoteGroups() {

  const requestURL = 'api/users';
  console.log(requestURL);
  // const options = {
  //   method: 'POST',
  //   headers: {
  //    'Content-Type': 'application/json'
  //   },
  //   body: sss
  // };
  // // Call our request helper (see 'utils/request')
  // const user = yield call(request, requestURL, options);
  //
  // if (!user.err) {
  //
  //   yield put(setField(['profile'],user.data));
  //   yield put(registerUserSuccess(user.data));
  // } else {
  //   yield put(registerUserFail(user.err.reason));
  // }
}


/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* homeSagas() {
  yield fork(takeLatest, GET_NOTE_GROUPS, getNoteGroups);
}

// Bootstrap sagas
export default homeSagas;
