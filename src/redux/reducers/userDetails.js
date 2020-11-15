import * as ActionTypes from '../actionTypes.js'

const defaultState = null

export const UserDetails = (state=defaultState, action)=>{
    switch(action.type){
        case ActionTypes.DETAILS_ADD:
            return action.payload
        case ActionTypes.DETAILS_DELETE:
            return defaultState
        default:
            return state
    }
}