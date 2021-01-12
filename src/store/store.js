import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {taskReducer} from './taskReducer';
import {authReducer} from './authReducer';

const middlewaresArr = [thunk];

if(process.env.NODE_ENV === 'development'){
    middlewaresArr.push(logger);
}

const mainReducer = combineReducers({
    taskReducer: taskReducer,
    authReducer: authReducer
})

const middlewares = applyMiddleware(...middlewaresArr);

export const store = createStore(mainReducer, middlewares);

