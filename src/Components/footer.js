import React from 'react'
import '../css/footer.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom';

function Footer(){
    const helps = ["Contact Us", "Help", "How to Join", "Provide Sercvice", 'Donate'];
    const links = ["Facebook", "Twitter", "Instagram", "Linkedin","About Us"];
    const promoteCity = ["Mumbai", "Delhi", "Gwalior", "Kolkata", "Chennai"];
    const promoteJobs = ["Electrician", "Plumber", "Maid", "House-keeper", "Security Guard"];
    const terms = ["©2020-20 Pranav Inc.","Condition of Use", "Privacy Policy", "India(English)"];


    return (
        <footer id="footer">
            <div className="footer-content border-bottom pb-3">
                 <Row>
                    <Col className="mt-5"  lg={3} xs={6}>
                        {helps.map((help,index) => <Row key={`help${index}`}><Link to='/' className="footer-link">{help}</Link></Row>)}
                    </Col>
                    <Col className="mt-5" lg={3} xs={6}>
                        {links.map((link,index) => <Row key={`link${index}`}><Link to="/" className="footer-link">{link}</Link></Row>)}
                    </Col>
                    <Col className="mt-5" lg={3} xs={6} >
                        {promoteCity.map((city,index) => <Row key={`city${index}`}><Link to="/" className="footer-link">{city}</Link></Row>)}
                    </Col>
                    <Col className="mt-5" lg={3} xs={6}>
                        {promoteJobs.map((job,index) => <Row key={`job${index}`}><Link to="/" className="footer-link">{job}</Link></Row>)}
                    </Col>
                </Row>
            </div>
            <Row className="footer-content text-center">
                {terms.map((term,index) => 
                    <Col className="mb-3" lg={3} key={`term${index}`} sm={6}>
                        <Link to="/" className="footer-link ml-0"  ><span className="mx-auto">{term}</span> </Link>
                    </Col>
                )}
            </Row>
        </footer>
    );
}

export default Footer;