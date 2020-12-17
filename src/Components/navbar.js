/* eslint-disable react/jsx-pascal-case */
//React imports

import React, { useEffect } from 'react'
import universalCookies from 'universal-cookie'

//bootstrap&css 
import '../css/navbar.css'
import logo from '../images/fix-it_logo.png'
import { Navbar, Nav, NavDropdown, Row, Modal, Col, Button, Alert, InputGroup, Form } from 'react-bootstrap'

//Router & Redux
import {withRouter,Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Control, LocalForm, Errors } from 'react-redux-form'

//Custom imports
import { verifyLogin, tryLogin,validateToken, logout } from '../redux/actionCreators/login.js'
import * as validators from '../redux/validators.js'
import {CUSTOMER, PROVIDER} from '../data/constants.js'

const mapStateToProps = (state) => {
    return {
        favorite: state.favorite,
        request: state.request,
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => ({
    verifyLogin: (user_details, status) => dispatch(verifyLogin(user_details,status)),
    tryLogin: () => dispatch(tryLogin()),
    logout: () => dispatch(logout()),
    validateToken: ()=> dispatch(validateToken())
});

const errorStyle = {
    marginLeft: "1rem",
    fontSize: "12px",
    color: "red"
}

function NavbarComponent(props) {

    let menu = ['Home', 'Browse', 'About'];
    if (props.login.status == CUSTOMER){
        menu=['Home', 'Browse', 'Requests', 'Chat']
    }
    else if(props.login.status == PROVIDER){
        menu = ['Home', 'Requests', 'Chat']
    }
    const cookies = new universalCookies()
    useEffect(()=>{
        if(cookies.get('token') && !props.login.status){
            console.log(cookies.get('token'));
            props.validateToken()
        }
    })
    
    return (
        <Navbar collapseOnSelect expand="lg">
            <Link to="/" className="navbar-brand">
                <img 
                    src={logo}
                    alt="fix-it logo"
                    className="navbar-logo"
                />
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
                <Nav className="mx-auto">
                    {
                        menu.map(item => <Link to={`/${item.toLocaleLowerCase()}`} className="navbar-link" key={item}>{item}</Link>)
                    }
                </Nav>
                <Nav>
                    <Link to='/' className="navbar-link">Help</Link>
                    {props.login.status ? <>
                        <NavDropdown title="Profile" className="navbar-link mx-0 pt-0" id="collasible-nav-dropdown">
                            <NavDropdown.Item key="account" className="d-flex justify-content-center"><Link className="navbar-sublink" to="/account">Account</Link></NavDropdown.Item>
                            <NavDropdown.Item key="reviews" className="d-flex justify-content-center"><Link className="navbar-sublink" to="/review">Reviews</Link></NavDropdown.Item>
                            <NavDropdown.Item key="requests" className="d-flex justify-content-center"><Link className="navbar-sublink" to="/requests">Requests</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="d-flex justify-content-center"><Link className="navbar-sublink" to="/home" onClick={() => { props.logout() }}>Sign Out!</Link></NavDropdown.Item>
                        </NavDropdown>
                        </> :
                        <Button onClick={() => props.tryLogin()} variant="info border-radius-20" >login</Button>
                        
                    }
                </Nav>
            </Navbar.Collapse>
            <Login show={props.login.try} err={props.login.err} login={(val,status) => props.verifyLogin(val,status)} onHide={() => { props.logout() }} />
        </Navbar>
    );
}


function Login(props) {

    function handleSubmit(values) {
        props.login(values,user);
    }
    
    const [user,setUser] = React.useState(CUSTOMER)
    return (
        <Modal
            {...props}
            dialogClassName=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="d-flex justify-content-center" closeButton>
                <span className="h3 mr-0 ml-auto">Login</span>
            </Modal.Header>
            <Row className="modal-nav">
                <Col className = {user === CUSTOMER?`modal-selected-left`:`modal-unselected-tab`}>
                    <button className="modal-nav-btn"onClick={() => { setUser(CUSTOMER) }}>Customer</button>
                </Col>
                <Col className={user === PROVIDER ? `modal-selected-right` : `modal-unselected-tab`}>
                    <button className="modal-nav-btn" onClick = {()=>{setUser(PROVIDER)}}>Provider</button>
                </Col>
            </Row>
            <LocalForm className="px-3" onSubmit={(values) => handleSubmit(values)}>
                <Modal.Body>
                    
                    <Row className="form-group mx-1">
                        <Form.Label className="font-italic font-weight-light">Email</Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Control.text
                                model=".user_email"
                                placeholder="pranav07092k@gmail.com"
                                className="form-control"
                                validators={{
                                    isEmail: validators.isEmail
                                }}
                            />
                        </InputGroup>
                        <Errors
                            style={errorStyle}
                            model=".user_email"
                            show="touched"
                            messages={{
                                isEmail: "*Valid e-mail required!"
                            }} 
                        />
                    </Row>
                    <Row className="form-group mx-1">
                        <Form.Label className="font-italic font-weight-light">Password</Form.Label>
                        <Control.text
                            model=".user_password"
                            type="password"
                            placeholder="********"
                            className="form-control"
                            validators={{
                                minLength: validators.minLength(8),
                                maxLength: validators.maxLength(108)
                            }}
                        />
                        <Errors
                            style={errorStyle}
                            model=".user_password"
                            show="touched"
                            messages={{
                                minLength: "* Must contain atleast 8 characters",
                                maxLength: "* Must contain atmax 108 characters"
                            }}
                        />
                    </Row>
                    {
                        props.err? 
                            <Alert variant="danger">
                                {props.err}
                            </Alert>:<></>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-auto" type="Submit" variant="info">Log In</Button>
                </Modal.Footer>
            </LocalForm>
        </Modal>
    );
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavbarComponent));