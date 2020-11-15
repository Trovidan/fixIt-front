import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { useState } from 'react'
import '../css/filter.css'

export default function Filter(props) {
    const categories = props.categories;
    const [show, setShow] = useState(true);
    function toggleShow() {
        let newShow = show === true ? false : true;
        setShow(newShow);
    }
    function handleChange(index) {
        let newState = props.categories;
        newState[index].selected = newState[index].selected === true ? false : true;
        props.changeState(newState);
    }
    function handleReset() {
        let newState = props.categories;
        for(let i in newState){
            newState[i].selected = false;
        }
        props.changeState(newState);
    }
    let categoryJSX = categories.map((category, index) =>
        <div key={category.title} className="ml-4">
            <FormControlLabel onChange={() => handleChange(index)} control={<Checkbox name={category.title} color="primary" checked={category.selected} />} label={category.title} />
        </div>
    );
    return (
        <div className="category-filter">
            <button className="category-filter-title" onClick={toggleShow}> {props.title} </button>
            <button className="category-filter-sub" onClick={handleReset}>Clear</button>
            {show ? categoryJSX : <></>}
        </div>
    )
}