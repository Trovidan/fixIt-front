import * as ActionTypes from '../actionTypes.js'


//Request List action

//fetches list of request data
export const fetchRequest = (userDetail) => (dispatch) =>{
    dispatch(loadRequest());
    let success=true;
    let error = 'error description'
    if(!success){
        dispatch(setRequestError(error))
        return
    }
    dispatch(setRequest([{_id:1, name:"Pseudo Name"}]))
}

function loadRequest(){
    return {
        type: ActionTypes.REQUEST_LOADING
    }
}

const setRequest = (requests)=>({
    type: ActionTypes.REQUEST_SUCCESS,
    payload: requests
}) 

const setRequestError = (err)=>({
    type:ActionTypes.REQUEST_FAILED,
    payload: err
})

// Favorite List actions
export const fetchFavorite = (userDetail) => (dispatch) => {
    dispatch(loadFavorite());
    let success = true;
    let error = 'error description'
    if (!success) {
        dispatch(setFavoriteError(error))
        return
    }
    dispatch(setFavorite([{ _id: 1, name: "Pseudo Name" }]))
}

function loadFavorite() {
    return {
        type: ActionTypes.FAVORITE_LOADING
    }
}

const setFavorite = (favorites) => ({
    type: ActionTypes.FAVORITE_SUCCESS,
    payload: favorites
})

const setFavoriteError = (err) => ({
    type: ActionTypes.FAVORITE_FAILED,
    payload: err
})