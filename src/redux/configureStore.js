import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { login } from './reducers/login.js';
import { FavoriteList } from './reducers/favoriteList.js'
import {RequestList} from './reducers/requestList.js'
import { UserDetails } from './reducers/userDetails.js';

export const configureStore = ()=>{
    const store = createStore(
        combineReducers(
            {
                login: login,
                favorite: FavoriteList,
                request: RequestList,
                userDetails: UserDetails
            }
        ),
        applyMiddleware(thunk,logger)
    );
    return store;
}
