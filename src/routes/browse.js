import React, { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {ServiceProvider} from '../data/serviceProviders.js'
import Filter from '../Components/filter.js'
import * as filters from '../data/filters.js'
import '../css/browse.css'
import BrowseTile from '../Components/browseTile.js'
import axios from '../axios.js'

export default function Browse() {
    const [state,setState] = useState({
        providers: undefined,
        error: "",
        services: filters.services,
        experience: filters.experience,
        rating: filters.rating,
        gender: filters.gender
    });

    function fetchProviders() {
        
        axios.post('/fetch/provider',{}).then(response=>{
            setState({ ...state, error: "", providers: response.data })
        }).catch(err=>{
            setState({...state, error:"Looks like you are offline", providers: []})
        })
    }
    React.useEffect(() => {
        if (state.providers === undefined) {
            fetchProviders();
        }
    });

    function handleServices(newState) {
        console.log("changing state");
        setState({...state,services: newState});
        fetchProviders();
    }
    const handleExperience = (newState) => {
        setState({...state, experience: newState});
        fetchProviders();
    }
    const handleRating = (newState) => {
        setState({...state, rating:newState});
        fetchProviders();
    }
    const handleGender = (newState) => {
        setState({ ...state, gender: newState });
        fetchProviders();
    }
    let servicesJSX;


    if (state.error !== "") {
        servicesJSX = (
            <div className="browse-error">
                {state.error}
            </div>
        );
    }
    else if (state.providers === undefined) {
        servicesJSX = (
            <div className="providers-loading">
                <Spinner className="browse-spinner" animation="border" variant="success" />
            </div> 
        );
    }
    else if (state.providers.length === 0) {
        servicesJSX = (
            <div className="browse-error">
                Hang tight, Provider of your Choice is coming!
            </div>
        );
    }
    else {
        servicesJSX = (
            <>
                {
                    state.providers.map(provider=> <BrowseTile provider={provider}/>)
                }
            </>
        );
    }
    return (
        <div className="browse-page">
            <Row className="browse-body">
                <Col sm ={3} className="browse-filter">
                    <h3 className = "mb-3">Filters</h3>
                    <Filter title="Services" key="Services" categories={state.services} changeState={(newState) => handleServices(newState)}/>
                    <Filter title="Experience" key="Experience" categories={state.experience} changeState={(newState) => handleExperience(newState)} />
                    <Filter title="Rating" key="Rating" categories={state.rating} changeState={(newState) => handleRating(newState)}/>
                    <Filter title="Gender" key="Gender" categories={state.gender} changeState={(newState) => handleGender(newState)} />
                </Col>
                <Col sm={9} className="explore-body-books">
                    {servicesJSX}
                </Col>
            </Row>
        </div>
    );
}

