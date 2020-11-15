import * as ActionTypes from '../actionTypes.js'

const initialList = {
    loading: false,
    err: null,
    details: null
}

export const FavoriteList = (state = initialList, action) => {
    switch (action.types) {
        case ActionTypes.FAVORITE_LOADING:
            return { ...state, loading: true }
        case ActionTypes.FAVORITE_SUCCESS:
            return { ...initialList, details: action.payload }
        case ActionTypes.FAVORITE_FAILED:
            return { ...state, err: action.payload }
        default:
            return state
    }
}