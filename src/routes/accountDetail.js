import React from 'react'
import axios from '../axios.js'
import '../css/accountDetails.css'
import {Row, Col, Button, Alert, Form } from 'react-bootstrap'

//Router & Redux
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { LocalForm, Errors, Field } from 'react-redux-form'

//Custom imports
import * as validators from '../redux/validators.js'
import { PROVIDER } from '../data/constants'
import { set_Details } from '../redux/actionCreators/login.js'

const mapStateToProps = (state) => ({
    login: state.login,
    userDetails: state.userDetails
})

const mapDispatchToProps = (dispatch)=>({
    setDetails: (userDetails)=>dispatch(set_Details(userDetails))
})

const errorStyle = {
    marginLeft: "1rem",
    fontSize: "12px",
    color: "red"
}


const AccountDetails = (props)=>{
    const [state,setState] = React.useState({
        edit: false,
        response:<></>
    })
    if(!props.userDetails){
        return (
            <Redirect to='/browse'/>
        )
    }
    const handleSubmit = (values)=>{
        let apiAddress = '/customer/update'
        if(props.login.status == PROVIDER){
            apiAddress = '/provider/update'
        }
        axios.post(apiAddress, values,{withCredentials:true}).then(response=>{
            props.setDetails(response.data)
            setState({...state, response: <Alert variant="success">Saved change Successfully!</Alert>})
        }).catch(err=>{
            console.log(err);
            setState({ ...state, response: <Alert variant="danger">Encountered Error while saving changes!</Alert> })
        })
    }
    return (
        <div className = "account-body">
            <div className= "account-container">
                <div className="account-heading">
                    User's Profile
                </div>
                <div className="account-detail-container">
                    {state.response}
                    <LocalForm 
                        onSubmit={(values)=>handleSubmit(values)}
                        initialState = {{
                            name: props.userDetails.name,
                            email: props.userDetails.email,
                            contactNumber: props.userDetails.contactNumber,
                            address: props.userDetails.address,
                            city: props.userDetails.city,
                            state: props.userDetails.state,
                            gender: props.userDetails.gender
                        }}
                    >
                        <Row className="ml-5">
                            <Col sm={5} className = " account-detail-field">
                                <Form.Label className="font-italic">Name:</Form.Label>
                                <Field
                                    model=".name"
                                    style={{ width: "22rem" }}
                                    validators={{
                                        minLength: validators.minLength(3),
                                        maxLength: validators.maxLength(30)
                                    }}
                                >
                                    <input className="form-control" type="text" disabled={!state.edit} placeholder={props.userDetails.name} />
                                </Field>
                                <Errors
                                    style={errorStyle}
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: "* Must contain atleast 3 characters",
                                        maxLength: "* Must contain atmax 30 characters"
                                    }}
                                />
                            </Col>
                            <Col sm={7} className=" account-detail-field">
                                <Form.Label className="font-italic ">Email:</Form.Label>
                                <Field
                                    model=".email"
                                    style={{ width: "22rem" }}
                                    validators={{
                                        isEmail: validators.isEmail
                                    }}
                                >
                                    <input className="form-control" type="email" disabled={!state.edit} placeholder={props.userDetails.email} />
                                </Field>
                                <Errors
                                    style={errorStyle}
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        isEmail: "*should be a valid email"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="ml-5">
                            <Col sm={5} className=" account-detail-field">
                                <Form.Label className="font-italic   ">Phone Number:</Form.Label>
                                <Field
                                    model=".contactNumber"
                                    style={{ width: "22rem" }}
                                    validators={{
                                        isNumber: validators.isPhoneNumber
                                    }}
                                >
                                    <input className="form-control" type="text" disabled={!state.edit} placeholder={props.userDetails.contactNumber} />
                                </Field>
                                <Errors
                                    style={errorStyle}
                                    model=".contactNumber"
                                    show="touched"
                                    messages={{
                                        isNumber: "*should be a valid phone number"
                                    }}
                                />
                            </Col>
                            <Col sm={7} className=" account-detail-field">
                                <Form.Label className="font-italic   ">Gender:</Form.Label>
                                <Field
                                    model=".gender"
                                    style={{ width: "22rem" }}
                                    validators={{
                                        required: validators.greatorThen("0")
                                    }}
                                >
                                    <select className="form-control" disabled={!state.edit}>
                                        <option value={0} disabled selected>--</option>
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                        <option value={"Other"}>Not Like to disclose</option>
                                    </select>
                                </Field>
                                <Errors
                                    style={errorStyle}
                                    model=".gender"
                                    show="touched"
                                    messages={{
                                        required: "*required"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="ml-5">
                            <Col sm={5} className=" account-detail-field">
                                <Form.Label className="font-italic">Address:</Form.Label>
                                <Field
                                    model=".address"
                                    style={{ width: "22rem" }}
                                    validators={{
                                        minLength: validators.minLength(10),
                                        maxLength: validators.maxLength(150)
                                    }}
                                >
                                    <textarea rows="5" className="form-control" disabled={!state.edit} placeholder={props.userDetails.address} />
                                </Field>
                                <Errors
                                    style={errorStyle}
                                    model=".address"
                                    show="touched"
                                    messages={{
                                        minLength: "* Must contain atleast 10 characters",
                                        maxLength: "* Must contain atmax 150 characters"
                                    }}
                                />
                            </Col>
                            <Col sm={7} className=" account-detail-field">
                                <Form.Label className="font-italic   ">City:</Form.Label>
                                <Field
                                    model=".city"
                                    style={{ width: "22rem" }}
                                    validators={{
                                        minLength: validators.minLength(2),
                                        maxLength: validators.maxLength(20)
                                    }}
                                >
                                    <input className="form-control" disabled={!state.edit} placeholder={"City"} />
                                </Field>
                                <Errors
                                    style={errorStyle}
                                    model=".city"
                                    show="touched"
                                    messages={{
                                        minLength: "* Must contain atleast 3 characters",
                                        maxLength: "* Must contain atmax 20 characters"
                                    }}
                                />
                                <Form.Label className="font-italic mt-3">State:</Form.Label>
                                <Field
                                    model=".state"
                                    style={{ width: "22rem" }}
                                    validators={{
                                        minLength: validators.minLength(2),
                                        maxLength: validators.maxLength(20)
                                    }}
                                >
                                    <input className="form-control" disabled={!state.edit} placeholder={"State"} />
                                </Field>
                                <Errors
                                    style={errorStyle}
                                    model=".state"
                                    show="touched"
                                    messages={{
                                        minLength: "* Must contain atleast 3 characters",
                                        maxLength: "* Must contain atmax 20 characters"
                                    }}
                                />
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-4">
                            {
                                state.edit?
                                    <>
                                        <Button variant="info" className="border-radius-10 px-3 mr-5" type="submit">Save Changes</Button>
                                        <Button variant="danger" className="border-radius-10 px-3 " onClick={() => setState({ edit: false })}>Cancel</Button>
                                    </>:
                                    <></>
                            }
                            
                        </div>
                    </LocalForm>
                    {
                        state.edit?<></>:
                            <div className="d-flex justify-content-center mt-3">
                                <Button variant="info" className="border-radius-10 px-3 " onClick={() => setState({ edit: true })}>Edit Details</Button>            
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AccountDetails))