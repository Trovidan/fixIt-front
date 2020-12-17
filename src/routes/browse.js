import React, { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Filter from '../Components/filter.js'
import * as filters from '../data/filters.js'
import '../css/browse.css'
import BrowseTile from '../Components/browseTile.js'
import axios from '../axios.js'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { PROVIDER } from '../data/constants.js'

const mapStateToProps = (state)=>({
    login: state.login
})

function Browse(props) {
    const [state,setState] = useState({
        providers: undefined,
        error: "",
        services: filters.services,
        experience: filters.experience,
        rating: filters.rating,
        gender: filters.gender
    });

    function fetchProviders() {
        let experience = minVal(state.experience)
        let rating = minVal(state.rating)
        
        axios.post('/fetch/provider',{service: state.services, gender: state.gender, experience: experience, rating: rating}).then(response=>{
            setState({ ...state, error: "", providers: response.data })
        }).catch(err=>{
            setState({...state, error:"Looks like you are offline!!!", providers: []})
        })
    }
    React.useEffect(() => {
        if (state.providers === undefined) {
            fetchProviders();
        }
    });
    if(props.login.status == PROVIDER){
        return (
            <Redirect to='/home'/>
        )
    }
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
            <div className="browse-providers-loading">
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
                    state.providers.map(provider=> <BrowseTile key={provider._id} provider={provider}/>)
                }
            </>
        );
    }
    return (
        <div className="browse-page">
            <Row className="browse-body">
                <Col sm ={3}>
                    <div className="browse-filter">
                        <h3 className="mb-3">Filters</h3>
                        <Filter title="Services" key="Services" type={1} categories={state.services} changeState={(newState) => handleServices(newState)} />
                        <Filter title="Experience" key="Experience" type={2} categories={state.experience} changeState={(newState) => handleExperience(newState)} />
                        <Filter title="Min - Rating" key="Rating" type={2} categories={state.rating} changeState={(newState) => handleRating(newState)} />
                        <Filter title="Gender" key="Gender" type={1} categories={state.gender} changeState={(newState) => handleGender(newState)} />
                    </div>
                </Col>
                <Col sm={9} className="explore-body-books">
                    {servicesJSX}
                </Col>
            </Row>
        </div>
    );
}

function minVal (filter){
    let min = 0
    for(let i=0; i<filter.length;i++){
        if(filter[i].selected ){
            min = i+1
        }
    }
    return min
}

export default withRouter(connect(mapStateToProps)(Browse))