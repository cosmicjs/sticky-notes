import { createStore, applyMiddleware } from 'redux';
import homeReducer from './containers/Home/reducer';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const store = createStore(
  homeReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;
