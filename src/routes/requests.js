import React from 'react'

//Bootstrap and css
import Spinner from 'react-bootstrap/Spinner'
import '../css/requests.css'

//Router & Redux
import {  withRouter,Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { tryLogin } from '../redux/actionCreators/login.js'
import { addServiceRequest, removeServiceRequest } from '../redux/actionCreators/requestService'
import axios from '../axios.js'

//custom imports 
import BrowseTile from '../Components/browseTile.js'
import { ACCEPTED, CUSTOMER, PENDING, PROVIDER } from '../data/constants'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        userDetails: state.userDetails
    }
}

const mapDispatchToProps = (dispatch) => ({
    tryLogin: () => dispatch(tryLogin()),
    addServiceRequest: (userDetails, providerID) => dispatch(addServiceRequest(userDetails, providerID)),
    removeServiceRequest: (userDetails, providerID) => dispatch(removeServiceRequest(userDetails, providerID))
});

const Request = (props)=>{
    const [state,setState] = React.useState({
        providers: undefined,
        error: undefined,
        display: PENDING
    })

    let requestJSX = (
        <div style={{ width: "70%", textAlign: "center", minHeight: "80vh" }}>
            <h1>Make requests appear here</h1>
        </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function fetchProviders() {
        let userID = []
        props.userDetails.requests.map( (request) => {
            userID.push(request._id)
            return true
        })
        
        if(userID.length>0 && props.login.status == CUSTOMER){
            axios.post('/fetch/provider', { ids: userID }).then(response => {
                console.log(response)
                setState({ ...state, error: undefined, providers: response.data })
            }).catch(err => {
                setState({ ...state, error: "Looks like you are offline", providers: [] })
            })
        }
        else if (userID.length > 0 && props.login.status == PROVIDER) {
            axios.post('/fetch/customer', { ids: userID }).then(response => {
                console.log(response)
                setState({ ...state, error: undefined, providers: response.data })
            }).catch(err => {
                setState({ ...state, error: "Looks like you are offline", providers: [] })
            })
        }

        else{
            setState({ ...state, error: undefined, providers: [] })
        }
    }

    React.useEffect(()=>{
        if (props.userDetails && state.providers === undefined){
            fetchProviders()
        }
    }, [fetchProviders, props.userDetails, state])

    if (!props.login.status) {
        return (
            <Redirect to='/home' />
        )
    }
    
    //define requestJSX in case of error i.e. error!=undefined
    if (state.error !== undefined) {
        requestJSX = (
            <div className="requests-error">
                {state.error}
            </div>
        );
    }
    
   
    //define requestJSX in case of providers are loading i.e. providers === undefined
    else if (state.providers === undefined) {
        requestJSX = (
            <div className="requests-providers-loading">
                <Spinner className="requests-spinner" animation="border" variant="success" />
            </div>
        );
    }
    //define requestJSX in case provider are there
    else {
        let accepted = []
        let pending = []
        
        props.userDetails.requests.map(request => {
            if(request.status == PENDING){
                pending.push(request._id)
            }
            else{
                accepted.push(request._id)
            }
            return true;
        })

        if(state.display === PENDING){
            if (pending.length === 0) {
                requestJSX = (
                    <div className="requests-error">
                        <Link to="/browse" className="requests-error">Let's{props.login.status == PROVIDER ? " wait for " : " make "}some fresh Requests!!</Link>
                    </div>
                );
            }
            else{
                requestJSX = (
                    <>
                        {
                            state.providers.map(provider => {
                                return pending.includes(provider._id)?
                                    <BrowseTile key={provider._id} customer={props.login.status == PROVIDER ? true : false} provider={provider} provider={provider} />:
                                    <></>
                            })
                        }
                    </>
                )
            }
        }
        else{
            if (accepted.length === 0) {
                requestJSX = (
                    <div className="requests-error">
                        <Link to="/browse" className="requests-error">Let's{props.login.status == PROVIDER ? " wait for " : " make "}some fresh Requests!!</Link>
                    </div>
                );
            }
            else {
                requestJSX = (
                    <>
                        {
                            state.providers.map(provider => {
                                return accepted.includes(provider._id) ?
                                    <BrowseTile key={provider._id} customer = {props.login.status == PROVIDER? true:false} provider={provider} /> :
                                    <></>
                            })
                        }
                    </>
                )
            }
        }
    }
    console.log(state);
    return (
        <div className = "requests-page">
            <div className = "requests-body">
                <Row className="requests-title">
                    <Col className={state.display === PENDING ? 'request-title-active' : 'request-title-passive'}>
                        <button onClick={() => setState({...state, display: PENDING})}>
                            Pending Requests
                        </button>
                    </Col>
                    <Col className={state.display === ACCEPTED ? 'request-title-active' : 'request-title-passive'}>
                        <button onClick= {()=>setState({...state, display: ACCEPTED})}>
                            Accepted Requests
                        </button>                   
                    </Col>
                </Row>
                {requestJSX}
            </div>
        </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Request))