import axios from '../../axios.js'
import {set_Details} from './login.js'
import {CUSTOMER} from '../../data/constants.js'

//modify userDetails use while integration

export const addServiceRequest = (userDetails,providerID) => (dispatch) =>{
    let result = {...userDetails}
    axios.post('/request/add',{providerID:providerID}, {withCredentials: true}).then(response=>{
        result.requests = [...response.data]
        dispatch(set_Details(result))
    }).catch(err=>{
        console.log("encountered error while adding request");
    })
}

export const removeServiceRequest = (userDetails, userID, status) => (dispatch) => {
    let result = { ...userDetails }
    if(status == CUSTOMER){
        axios.post('/request/delete', { providerID: userID }, { withCredentials: true }).then(response => {
            result.requests = [...response.data]
            dispatch(set_Details(result))
        }).catch(err => {
            console.log("encountered error while removing request");
        })
    } 
    else{
        axios.post('/request/deny', { customerID: userID }, { withCredentials: true }).then(response => {
            result.requests = [...response.data]
            dispatch(set_Details(result))
        }).catch(err => {
            console.log("encountered error while removing request");
        })
    }
}

export const acceptServiceRequest = (userDetails, userID, status) => (dispatch) => {
    let result = { ...userDetails }

    if (status == CUSTOMER) {
        return;
    }
    else {
        axios.post('/request/accept', { customerID: userID }, { withCredentials: true }).then(response => {
            result.requests = [...response.data]
            dispatch(set_Details(result))
        }).catch(err => {
            console.log("encountered error while removing request");
        })
    }
}

