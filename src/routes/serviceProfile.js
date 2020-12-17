//react
import React, { useState } from 'react'


//css
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import '../css/serviceProfile.css'
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MailIcon from '@material-ui/icons/Mail';
import DialpadIcon from '@material-ui/icons/Dialpad';
import CommentList from '../Components/commentList.js'
import StarRatings from 'react-star-ratings';
import Button from 'react-bootstrap/Button'

//custom functional imports
import axios from '../axios.js'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { tryLogin } from '../redux/actionCreators/login.js'
import { addServiceRequest, removeServiceRequest, acceptServiceRequest } from '../redux/actionCreators/requestService'
import { ACCEPTED, PENDING, PROVIDER } from '../data/constants'
import ReviewModal from '../Components/reviewModal.js'

// for making icons inline with text
const inline = { marginBottom: "8px" }

const mapStateToProps = (state) => {
    return {
        login: state.login,
        userDetails: state.userDetails,
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => ({
    tryLogin: () => dispatch(tryLogin()),
    addServiceRequest: (userDetails, providerID) => dispatch(addServiceRequest(userDetails, providerID)),
    removeServiceRequest: (userDetails, providerID, status) => dispatch(removeServiceRequest(userDetails, providerID, status)),
    acceptServiceRequest: (userDetails, providerID, status) => dispatch(acceptServiceRequest(userDetails, providerID, status)),
});

const ServiceProfile = (props)=> {
    console.log("rendering");
    const providerID = props.match.params.providerID;
    const [state,setState] = useState({
        provider: undefined,
        reviews: undefined,
        loading: true,
        err: undefined
    })

    const fetchProvider = () => {
        axios.post('/fetch/provider',{ids: [providerID]}).then(provider=>{
            let reviews = [];
            provider.data[0].reviews.map(review=>{
                reviews.push(review._id)
                return true;
            })
            console.log(provider.data[0]);
            axios.post('/review/fetch', {ids:reviews}).then(reviews=>{
                console.log(reviews);
                setState({ err: undefined, loading:false, provider: provider.data[0],reviews: reviews.data})
            }).catch(err => {
                console.log(err);
                setState({ ...state, loading: false, err: "Something Went Wrong!!!" })
            })
        }).catch(err=>{
            console.log(err);
            setState({...state, loading:false, err: "Something Went Wrong!!!"})
        })
    }

    React.useEffect(()=>{
        if(state.loading){
            fetchProvider()
        }
    })
    if(props.login.status == PROVIDER){
        return (
            <Redirect to='/requests'/>
        )
    }
    if(state.loading){
        return (
            <div className="service-provider-profile-page service-loading">
                <Spinner className="browse-spinner" animation="border" variant="success" />
            </div>
        )
    }
    else if(state.err){
        return (
            <div className="service-provider-profile-page service-loading">
                <div className="browse-error">
                    {state.err}
                </div>
            </div>
        )
    }

    let requestBtn = <Button variant="info" className="mx-auto px-1" onClick={() => props.tryLogin()}>Request Service</Button>;

    if(props.login.status ){
        let reqStatus = isRequested(props.userDetails.requests, state.provider._id)
        if(reqStatus == PENDING){
            requestBtn = <Button variant="danger" className="mx-auto px-1" onClick={() => props.removeServiceRequest(props.userDetails, state.provider._id, props.login.status)}>Cancel Request</Button>
        }
        else if(reqStatus == ACCEPTED){
            requestBtn = <Link className="btn btn-primary ml-2 px-4" to='/chat'> In Touch </Link>
        }
        else {
            requestBtn = <Button variant="info" className="mx-auto px-1" onClick={() => props.addServiceRequest(props.userDetails, state.provider._id)}>Request Service</Button>
        }  
    }
        
    let reviewBtn = <Button variant="secondary" className="mx-auto px-1" onClick={() => props.tryLogin()}>Review Service</Button>;
    
    if(props.login.status){
        reviewBtn = <Button variant="info" className="mx-auto px-1" onClick={() => setState({...state, review:true})}>Review Service</Button>;
    }
    return (
        <div className='service-provider-profile-page'>

            <Row className='service-provider-profile-body'>

                <Col sm={3} className="service-provider-profile-detail-container">
                    <Row >
                        <Image src={state.provider.imageUri} className="service-provider-profile-image pt-3" roundedCircle />
                    </Row>

                    <Row className="px-0 mt-3 mb-2 mx-0">
                        <Col className="px-0 mx-0">
                           {requestBtn}
                        </Col>
                        <Col className="px-0 mx-0">
                            {reviewBtn}
                        </Col>
                    </Row>
                    <div className=' pl-3 mt-3'>
                    
                        <Row className="service-provider-profile-name">
                            {state.provider.name}
                        </Row>
                        <Row className="mb-4">
                            <StarRatings rating={state.provider.rating ? state.provider.rating : 0} starRatedColor="rgb(255, 187, 0)" starEmptyColor="rgb(230, 247, 241)" numberOfStars={5} starDimension='1.5rem' starSpacing="1px" />
                        </Row>
                        
                        <Row className="service-provider-profile-detail mt-3">
                            <span><LocationOnIcon style={inline} /></span>
                            <span className='ml-3' > {state.provider.city}, {state.provider.state} </span>
                        </Row>
                        <Row className='service-provider-profile-detail'>
                            <span> <WorkIcon style={inline} /> </span>
                            <span className='ml-3' >{state.provider.service}</span>
                        </Row>
                        <Row className='service-provider-profile-detail'>
                            <span><ScheduleIcon style={inline} /></span>
                            <span className='ml-3'> 
                                Experience : 
                                {
                                    state.provider.experience.years ? `${state.provider.experience.years}yr ` : <></>} 
                                    {state.provider.experience.months ? `${state.provider.experience.months}mth` : <></>
                                }
                            </span>
                        </Row>
                        <Row className='service-provider-profile-detail'>
                            <span> <MailIcon style={inline} /> </span> 
                            <span className='ml-3' >{state.provider.email}</span>
                    </Row>
                    <Row className="service-provider-profile-detail">
                            <span><AccountBalanceWalletOutlinedIcon style={inline} /></span>
                        <span className='ml-3' > ₹{state.provider.chargesHr} / hr </span>
                    </Row>
                    <Row className="service-provider-profile-detail">
                            <span><AccountBalanceWalletOutlinedIcon style={inline} /></span>
                            <span className='ml-3' > ₹{state.provider.chargesDay} / day </span>
                    </Row>
                    <Row className='service-provider-profile-detail '>
                        <span> <DialpadIcon style={inline} /> </span>
                        <span className='ml-3' >{state.provider.contactNumber}</span>
                    </Row>
                    
                    </div>
                </Col>

                <Col >
                    <Row className='service-provider-profile-comment mb-4' >
                        <div className="px-3">
                        <h3 className="service-provider-profile-name mb-4 mt-3">{state.provider.name}'s Services!</h3>
                        <div className="comment-content text-secondary" dangerouslySetInnerHTML={{ __html: state.provider.description }}></div>
                        </div>
                    </Row>
                    <Row className='service-provider-profile-comment' >
                        <CommentList comments={state.reviews} loading={state.loading} rating={state.provider.rating}/>
                    </Row>
                </Col>
            </Row>
            <ReviewModal show={state.review} onHide={() => setState({ ...state, review: false })} providerID={state.provider._id} reload={() => setState({provider: undefined, reviews: undefined, loading: true, err: undefined })}/>
        </div>

    )
}

const isRequested = (requests,providerID)=>{
    let request = requests ?
        requests.filter(request => request._id === providerID) :
        undefined
    if (Array.isArray(request) && request.length > 0) {
        return request[0].status
    }
    return false
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceProfile))