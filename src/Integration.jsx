import React,{useState} from "react";
import './NumericalMethod/Method.css';
import SingleSimpson from "./NumericalMethod/Integration/Single-Simpson"
import CompositeSimpson from './NumericalMethod/Integration/Composite-Simpson'

function Integration(){
    const[method,setMethod] = useState("simpson")

    const handleMethodChange = (e) => {
        setMethod(e.target.value)
    }

    const renderMethod = () =>{
        switch(method){
            case "simpson" :
                return(<SingleSimpson/>)
            case 'composite-simpson':
                return (<CompositeSimpson/>)
        }
    }

    return(
        <div>
            <select className='custom-select' value={method} onChange={handleMethodChange}>
              <option value="simpson">Single Simpson's Rule</option>
              <option value="composite-simpson">Composite Simpson's Rule</option>
            </select>
            <div style={{padding: '2em'}}>
              {renderMethod()}
            </div>
        </div>
    );
}

export default Integration