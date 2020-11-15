import * as ActionTypes from '../actionTypes.js'
import axios from '../../axios.js'
import universalCookie from 'universal-cookie'


const cookies = new universalCookie();

export const verifyLogin = (user_details) => (dispatch) => {
    dispatch(loading_true());

    axios.post('/access/login',
        {
            email: user_details.user_email,
            password: user_details.user_password
        }).then(response=>{
            cookies.set('token', response.data.token, {maxAge: 1000 * 60 * 60 * 24})
            dispatch(login_user())
            dispatch(set_Details(response.data.userDetails))
        }).catch(err=>{
            if(err.response){
                dispatch(login_error(err.response.data))
            }
            else {
                alert(err)
            }
        })
}

export const logout = () => (dispatch)=> {
    cookies.remove('token')
    dispatch(login_termination())
    dispatch(reset_Details())
}

export const tryLogin = () => ({
    type: ActionTypes.LOGIN_TRY
});

export const validateToken = ()=>(dispatch)=>{
    let token = cookies.get('token')
    
    if(token){
        axios.get('/access/validate',{withCredentials:true}).then(response=>{
            dispatch(login_user())
            console.log(response);
            dispatch(set_Details(response.data.userDetails))
        }).catch(err=>{
            if(err.response){
                console.log("removing token")
                cookies.remove('token')
            }
        })
    }
}

const loading_true = () => ({
    type: ActionTypes.LOGIN_VERIFY
});

const login_user = () => ({
    type: ActionTypes.LOGIN_SUCCESS
})

const login_termination= ()=>({
    type: ActionTypes.LOGIN_TERMINATE
})

const login_error = (error) =>({
    type: ActionTypes.LOGIN_FAILED,
    payload: error
})

const set_Details = (user_details)=>({
    type: ActionTypes.DETAILS_ADD,
    payload: user_details
})

const reset_Details = ()=>({
    type: ActionTypes.DETAILS_DELETE
})
