import React from 'react';
import '../css/home.css'
import first from '../images/first.svg'
import second from '../images/second.svg'
import third from '../images/third.svg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

function Home(props) {
    const cities=['Select City','Gwalior','Delhi','Mumbai'];
    const services=['Select Services','Electrician','Plumber','Maid','House-Keeper','Security Guard'];
    const stripCustomerContent = [
        {
            uri: first,
            text: "Log in securely with your Fix-it account."
        },
        {
            uri: second,
            text: "Select the service you desire. Request Professional of your choice."
        },
        {
            uri: third,
            text: "Get in touch with the professional, enjoy your service!"
        },
    ];
    const stripProviderContent = [
        {
            uri: first,
            text: "Log in securely with your Service Provider Fix-it account."
        },
        {
            uri: second,
            text: "Setup your service profile. Wait for customer requests, approve request to give services."
        },
        {
            uri: third,
            text: "Get in touch with the customer, and provide your services!"
        },
    ];
    return (
        <div className="home-body">
        
            <Row className="d-flex justify-content-center home-hero">
                <Col xl={6} lg={12} md={12} className="home-hero-slogan">
                    <span className="d-flex justify-content-center home-hero-slogan-text ">Home Service. On Demand.</span>
                    <span className="home-hero-slogan-sub">Professionals You Choose.</span>
                    <Form>
                    <InputGroup className="mb-3 mx-auto mt-5"  style={{width:"65%", maxWidth:"20rem", minWidth:"17rem"}}>
                            <InputGroup.Prepend >
                                <Form.Control className="bg-dark text-light" as="select">
                                    {cities.map(city => <option key={city}>{city}</option>)}
                                </Form.Control>
                            </InputGroup.Prepend>
                            <Form.Control className="bg-dark text-light" as="select">
                                {services.map(service => <option key={service}>{service}</option>)}
                            </Form.Control>
                    </InputGroup>
                    </Form>
                </Col>
                <Col xl={6} lg={12} md={12} className="home-hero-image">
                </Col>
            </Row> 
            <ExplainStrip title="Get Service?" details={stripCustomerContent}/>
            <ExplainStrip title="Give Service?" details={stripProviderContent} />
        </div>
    );
}

function ExplainStrip(props) {
    return (
        <div className="explainStrip-container text-center">
            <h2 className="mb-5">{props.title}</h2>
            <Row>
                {props.details.map((detail,index) => 
                    <Col lg={4} xs={12} key={`${props.title}${index}`}>
                        <img src={detail.uri} className="explainStrip-image" alt="explain" />
                        <div className="max-width-25 mx-auto" >
                            <p>{detail.text}</p>
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    );
}


export default Home;