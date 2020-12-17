import * as ActionTypes from '../actionTypes.js'

const initialState = {
    loading: false,
    err: undefined,
    data: undefined
}

export const Reviews = (state = initialState, action)=>{
    switch(action.type){
        case ActionTypes.REVIEWS_FAILED:
            return {loading: false, err: action.payload, data: undefined}
        case ActionTypes.REVIEWS_LOADING:
            return { loading: true, err: action.payload, data: undefined }
        case ActionTypes.REVIEWS_RESET:
            return { loading: false, err: undefined, data: undefined }
        case ActionTypes.REVIEWS_UPDATE:
            return { loading: false, data: action.payload, err: undefined }
        default:
            return state
    }
}