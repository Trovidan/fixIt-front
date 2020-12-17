import * as ActionTypes from '../actionTypes.js'
import axios from '../../axios.js'
import universalCookie from 'universal-cookie'
import { reviewReset, reviewsFetch } from './reviews.js';


const cookies = new universalCookie();

export const verifyLogin = (user_details, status) => (dispatch) => {
    dispatch(loading_true());

    axios.post('/access/login',
        {
            email: user_details.user_email,
            password: user_details.user_password,
            status: status
        }).then(response=>{
            cookies.set('token', response.data.token, {maxAge: 1000 * 60 * 60 * 24, path: '/'})
            dispatch(reviewsFetch(response.data.userDetails))
            dispatch(set_Details(response.data.userDetails))
            dispatch(login_user(response.data.status))
        }).catch(err=>{
            if(err.response){
                dispatch(login_error(err.response.data))
            }
            else {
                dispatch(login_error("Unable to reach the server!!!"))
            }
        })
}

export const validateToken = () => (dispatch) => {
    let token = cookies.get('token')

    if (token) {
        axios.get('/access/validate', { withCredentials: true }).then(response => {
            dispatch(reviewsFetch(response.data.userDetails))
            dispatch(set_Details(response.data.userDetails))
            dispatch(login_user(response.data.status))
        }).catch(err => {
            if (err.response) {
                cookies.remove('token')
            }
        })
    }
}

export const logout = () => (dispatch)=> {
    cookies.remove('token', { path: '/' })
    console.log(cookies.get('token'));
    dispatch(reviewReset())
    dispatch(login_termination())
    dispatch(reset_Details())
}

export const tryLogin = () => ({
    type: ActionTypes.LOGIN_TRY
});

const loading_true = () => ({
    type: ActionTypes.LOGIN_VERIFY
});

const login_user = (status) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: status
})

const login_termination= ()=>({
    type: ActionTypes.LOGIN_TERMINATE
})

const login_error = (error) =>({
    type: ActionTypes.LOGIN_FAILED,
    payload: error
})

export const set_Details = (user_details)=>({
    type: ActionTypes.DETAILS_ADD,
    payload: user_details
})

const reset_Details = ()=>({
    type: ActionTypes.DETAILS_DELETE
})
