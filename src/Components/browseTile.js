import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import '../css/browseTile.css'
import StarRatings from 'react-star-ratings';

//Router & Redux
import { Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { tryLogin } from '../redux/actionCreators/login.js'
import { addServiceRequest, removeServiceRequest, acceptServiceRequest } from '../redux/actionCreators/requestService'
import { ACCEPTED, PENDING, PROVIDER } from '../data/constants'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        userDetails: state.userDetails
    }   
}

const mapDispatchToProps = (dispatch) => ({
    tryLogin: () => dispatch(tryLogin()),
    addServiceRequest: (userDetails, providerID) => dispatch(addServiceRequest(userDetails, providerID)),
    removeServiceRequest: (userDetails, providerID,status) => dispatch(removeServiceRequest(userDetails, providerID,status)),
    acceptServiceRequest: (userDetails, providerID, status) => dispatch(acceptServiceRequest(userDetails, providerID, status)),
});

function BrowseTile(props){
    
    const provider = props.provider
    let buttonJSX;
    buttonJSX = props.login.status ?
        <Button variant="info" onClick={() => props.addServiceRequest(props.userDetails, provider._id)}>Request Service</Button> :
        <Button variant="info" onClick={() => props.tryLogin()}>Request Service</Button>
        
    let request = props.userDetails && props.userDetails.requests?
        props.userDetails.requests.filter(request => request._id === provider._id):
        undefined
    if (request && request.length > 0){
        buttonJSX = request[0].status == PENDING?
            <>
            <Button variant="danger" onClick={() => props.removeServiceRequest(props.userDetails, provider._id, props.login.status)}>Cancel Request</Button>
            {
                props.login.status == PROVIDER ?
                        <Button variant="success" className ="mt-3" onClick={() => props.acceptServiceRequest(props.userDetails, provider._id, props.login.status)}>Accept Request</Button>
                        :<></>
            }
            </>
            : <Link className="btn btn-primary" to='/chat'>In Touch</Link>
    }
    
    return(
        <div className="browseTile-body">
            <Row>
                <Col sm={3} className="ml-5 pl-0 pr-0 pb-3 pt-3">
                    <img src={provider.imageUri} className="browseTile-image" alt="Provider"/>
                </Col>
                <Col sm={5} className="ml-3 pl-0 pr-0 pb-1 pt-3">
                    <Row className="browseTile-provider-name">
                        <Link className="text-dark" to={`/service/${provider._id}`}>{provider.name}</Link>
                    </Row>
                    <Row className="browseTile-provider-details">
                        {provider.city}, {provider.state}
                    </Row>
                    {
                        props.customer?<></>:
                        <>
                                <Row className="mb-2 mt-2 browseTile-provider-service">
                                    {provider.service}
                                </Row>
                                <Row >
                                    <Col className="browseTile-provider-details" sm={3}>
                                        Experience
                                    </Col>
                                    <Col className="browseTile-provider-details" sm={9}>
                                        : {provider.experience.years ? `${provider.experience.years} yr` : <></>} {provider.experience.months ? `${provider.experience.months} mth` : <></>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="browseTile-provider-details" sm={3}>
                                        rating
                                    </Col>
                                    <Col className="browseTile-provider-details" sm={9}>
                                        {
                                            provider.rating ?
                                                <>: {provider.rating} ⭐</> :
                                                <>: --</>
                                        }

                                    </Col>
                                </Row>
                        </>
                    }
                    
                </Col>
                <Col className="browseTiles-btn-container" sm={3}>
                    {
                        props.customer?<></>:
                            <StarRatings rating={provider.rating ? provider.rating:0} starRatedColor="rgb(255, 187, 0)" starEmptyColor="rgb(230, 247, 241)" numberOfStars={5} starDimension='1.5rem' starSpacing="1px" />
                    }
                    {buttonJSX}
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BrowseTile))