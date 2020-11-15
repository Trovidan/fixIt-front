import * as ActionTypes from '../actionTypes.js'

const initialList = {
    loading:false,
    err: null,
    details: null
}

//Request list is an array of request details

export const RequestList = (state=initialList,action)=>{
    switch(action.types){
        case ActionTypes.REQUEST_LOADING:
            return { ...state, loading: true }
        case ActionTypes.REQUEST_SUCCESS:
            return {...initialList, details: action.payload}
        case ActionTypes.REQUEST_FAILED:
            return {...state, err: action.payload}
        default:
            return state
    }
} 