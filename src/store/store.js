import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {mainReducer} from './reducer';

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(mainReducer, middlewares);

