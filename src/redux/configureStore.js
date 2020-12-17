import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { login } from './reducers/login.js';
import { Reviews } from './reducers/reviews.js';
import { UserDetails } from './reducers/userDetails.js';

export const configureStore = ()=>{
    const store = createStore(
        combineReducers(
            {
                login: login,
                userDetails: UserDetails,
                reviews: Reviews
            }
        ),
        applyMiddleware(thunk,logger)
    );
    return store;
}
