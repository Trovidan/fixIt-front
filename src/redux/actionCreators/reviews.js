import * as ActionTypes from '../actionTypes.js'
import axios from '../../axios.js'


export const reviewsFetch = (userDetails)=>(dispatch)=>{
    dispatch(reviewLoading())

    let ids = []
    userDetails.reviews.map(review => {
        ids.push(review._id)
        return true;
    })
    axios.post('/review/fetch', {ids: ids}).then(response=>{
        dispatch(reviewUpdate(response.data))
    }).catch(err=>{
        dispatch(reviewError(err))
    })
}


export const reviewDelete = async (reviewID, providerID, userDetails)=> {
    let rv = false;
    await axios.post('/review/delete',{reviewID : reviewID, providerID : providerID},{ withCredentials: true}).then(response=>{
        reviewsFetch(userDetails)
        rv= true
    }).catch(err=>{
        return false;
    })
    return rv;
}

export const reviewError = (err)=>({
    type : ActionTypes.REVIEWS_FAILED,
    payload : err
})

export const reviewLoading = ()=>({
    type : ActionTypes.REVIEWS_LOADING
})

export const reviewUpdate = (reviews)=>({
    type : ActionTypes.REVIEWS_UPDATE,
    payload: reviews
})

export const reviewReset = ()=>({
    type: ActionTypes.REVIEWS_RESET
})