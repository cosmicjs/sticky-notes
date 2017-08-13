import { createStore, applyMiddleware, combineReducers } from 'redux';

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

const reducers = combineReducers({
  home: homeReducer,
  group: groupReducer,
});
const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(homeSagas)
sagaMiddleware.run(groupSagas)

export default store;
