import { createStore, applyMiddleware } from 'redux';

import homeReducer from './containers/Home/reducer';
import homeSagas from './containers/Home/sagas';


import groupReducer from './containers/Group/reducer';
import groupSagas from './containers/Group/sagas';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  thunkMiddleware,
];

const store = createStore(
  homeReducer,
  groupReducer,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(homeSagas)
sagaMiddleware.run(groupSagas)

export default store;
