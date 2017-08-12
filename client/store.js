import { createStore, applyMiddleware } from 'redux';

import homeReducer from './containers/Home/reducer';
import homeSagas from './containers/Home/sagas';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  thunkMiddleware,
];

const store = createStore(
  homeReducer,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(homeSagas)

export default store;
