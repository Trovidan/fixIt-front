//react
import React from 'react'
import axios from '../axios.js'

//css
import {Col, Row, Spinner, Button, Form, Modal, Alert} from 'react-bootstrap'
import '../css/serviceProfile.css'

//custom functional imports
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as validators from '../redux/validators.js'
import { LocalForm, Errors, Field } from 'react-redux-form'
import { tryLogin } from '../redux/actionCreators/login.js'
import { reviewDelete, reviewsFetch } from '../redux/actionCreators/reviews'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        userDetails: state.userDetails,
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => ({
    tryLogin: () => dispatch(tryLogin()),
    reviewFetch: (userDetails) => dispatch(reviewsFetch(userDetails)),
    reviewDelete: (reviewID, providerID, userDetails) => reviewDelete(reviewID, providerID, userDetails),
});

const errorStyle = {
    marginLeft: "1rem",
    fontSize: "12px",
    color: "red"
}

const ReviewModal = (props) => {
    const [resultJSX,setResultJSX] = React.useState(<></>)
    
    const reloadService = ()=>{
        props.reviewFetch(props.userDetails)
        props.reload()
    }
    const reviewAdd = (providerID, title, content, rating) => {
        axios.post('/review/add', { title: title, content: content, rating: rating, providerID: providerID }, { withCredentials: true }).then(response => {
            setResultJSX(<Alert variant="success">Added reivew!</Alert>)
            setTimeout(() => {
                reloadService()
            }, 1000);
        }).catch(err => {
            // console.log(err);
            if (err.response) {
                setResultJSX(<Alert variant="danger">{err.response.data}</Alert>)
            }
            else {
                setResultJSX(<Alert variant="danger">Encountered Error while editing reivew!</Alert>)
            }
        })
    }

    const reviewEdit = (providerID, title, content, rating, reviewID) => {
        axios.post('/review/edit', { title: title, content: content, rating: rating, providerID: providerID, reviewID: reviewID }, { withCredentials: true }).then((response) => {
            setResultJSX(<Alert variant="success">Edited reivew!</Alert>)
            setTimeout(() => {
                reloadService()
            }, 1000);
        }).catch(err => {
            // console.log(err);
            if(err.response){
                setResultJSX(<Alert variant="danger">{err.response.data}</Alert>)    
            }
            else{
                setResultJSX(<Alert variant="danger">Encountered Error while editing reivew!</Alert>)    
            }
        })
    } 

    function handleSubmit(values) {
        if(reviews.new){
            reviewAdd(props.providerID, values.title, values.content, values.rating)
        }
        else{
            reviewEdit(props.providerID, values.title, values.content, values.rating, reviews.reviewID)
        }
    }

    let reviews = {
        content: "Write your Review here!",
        title: "Title",
        rating: "--",
        reviewID: undefined,
        new: true
    }
    let reviewBtn = <Button className="mx-auto" type="Submit" variant="info">Add Review</Button>
    if(props.reviews.loading){
        console.log("loading")
        return (
            <Modal
                {...props}
                dialogClassName=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="d-flex justify-content-center" closeButton>
                    <span className="h3 mr-0 ml-auto">Review</span>
                </Modal.Header>
                <Modal.Body style={{ height: "12rem", display: "grid", placeContent: "center" }}> 
                    <Spinner style={{width:"3rem", height:"3rem"}} animation="border" variant="success"/>
                </Modal.Body>
                
            </Modal>
        )
    }
    if(props.reviews.err){
        return(
            <Modal
                {...props}
                dialogClassName=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="d-flex justify-content-center" closeButton>
                    <span className="h3 mr-0 ml-auto">Review</span>
                </Modal.Header>
                <Modal.Body style={{ height: "12rem", display: "grid", placeContent: "center" }}>
                    <h2>
                        Unable to connect to Server!!
                    </h2>
                </Modal.Body>

            </Modal>    
        )
    }
    if (Array.isArray(props.reviews.data)){
        console.log(props.reviews.data);
        props.reviews.data.map(review => {
            if(review.provider === props.providerID){
                reviews ={
                    title : review.title,
                    content: review.content,
                    rating: review.rating,
                    reviewID: review._id
                }
                reviewBtn = <Button className="mx-auto" type="Submit" variant="info">Edit Review</Button>
            }
            return 0;
        })
    }
    return (
        <Modal
            {...props}
            dialogClassName=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="d-flex justify-content-center" closeButton>
                <span className="h3 mr-0 ml-auto">Review</span>
            </Modal.Header>
            <LocalForm className="px-3" onSubmit={(values) => handleSubmit(values)}>
                <Modal.Body>
                    {resultJSX}                    
                    <Row className="form-group mx-1">
                        <Col sm={8} className="pl-0">
                            <Form.Label className="font-italic font-weight-light">Title</Form.Label>
                            <Field
                                model=".title"
                                style={{ width: "100%" }}
                                validators={{
                                    minLength: validators.minLength(3),
                                    maxLength: validators.maxLength(100)
                                }}
                            >
                                <input className="form-control" type="text" placeholder={reviews.title} />
                            </Field>
                            <Errors
                                style={errorStyle}
                                model=".title"
                                show="touched"
                                messages={{
                                    minLength: "* Must contain atleast 3 characters",
                                    maxLength: "* Must contain atmax 100 characters"
                                }}
                            />
                        </Col>
                        <Col sm={4} className="pr-0">
                            <Form.Label className="font-italic font-weight-light">Rating</Form.Label>
                            <Field
                                model=".rating"
                                style={{ width: "70%" }}
                                validators = {{
                                    required: validators.greatorThen("0")
                                }}
                            >
                                <select className="form-control"> 
                                    <option value={0} disabled selected>--</option>
                                    <option value={5}>5 ⭐</option>
                                    <option value={4}>4 ⭐</option>
                                    <option value={3}>3 ⭐</option>
                                    <option value={2}>2 ⭐</option>
                                    <option value={1}>1 ⭐</option>
                                </select>
                            </Field>
                            <Errors
                                style={errorStyle}
                                model=".rating"
                                show="touched"
                                messages={{
                                    required: "*Required"
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className="form-group mx-1">
                        <Form.Label className="font-italic font-weight-light">Review</Form.Label>
                        <Field
                            model=".content"
                            style= {{width:'100%'}}
                            validators={{
                                minLength: validators.minLength(10),
                                maxLength: validators.maxLength(1000)
                            }}
                        >
                            <textarea className="form-control" placeholder={reviews.content} rows={3}/>   
                        </Field>
                        <Errors
                            style={errorStyle}
                            model=".content"
                            show="touched"
                            messages={{
                                minLength: "* Must contain atleast 10 characters",
                                maxLength: "* Must contain atmax 1000 characters"
                            }}
                        />
                    </Row>
                    {
                        props.err ?
                            <Alert variant="danger">
                                {props.err}
                            </Alert> : <></>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {reviewBtn}
                </Modal.Footer>
            </LocalForm>
        </Modal>
    );
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewModal))