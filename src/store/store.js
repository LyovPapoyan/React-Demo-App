import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {mainReducer} from './reducer';

const middlewaresArr = [thunk];

if(process.env.NODE_ENV === 'development'){
    middlewaresArr.push(logger);
}

const middlewares = applyMiddleware(...middlewaresArr);

export const store = createStore(mainReducer, middlewares);

