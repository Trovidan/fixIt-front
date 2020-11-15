import * as ActionTypes from '../actionTypes.js'

//modify userDetails use while integration

export const addServiceRequest = (userDetails,providerID) =>{
    let reqID = "hfkbfoaifa"
    userDetails.requests = [...userDetails.requests, {requestID:reqID,providerID:providerID}]
    return ({
        type: ActionTypes.DETAILS_ADD,
        payload: {...userDetails}
    })
}

export const removeServiceRequest = (userDetails, providerID) => {

    userDetails.requests = userDetails.requests.filter(request => request.providerID!==providerID)
    console.log(userDetails.requests);
    return ({
        type: ActionTypes.DETAILS_ADD,
        payload: {...userDetails}
    })
}