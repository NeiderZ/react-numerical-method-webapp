import React,{useState, useEffect} from "react";
import './NumericalMethod/Method.css';
import SingleSimpson from "./NumericalMethod/Integration/Single-Simpson"
import CompositeSimpson from './NumericalMethod/Integration/Composite-Simpson'
import { useNavigate, useParams } from "react-router-dom";

function Integration(){
    const navigate = useNavigate();
    const { methodParam } = useParams();
    const[method,setMethod] = useState(methodParam)

    useEffect(() => {
        if (methodParam && methodParam !== method) {
            setMethod(methodParam);
        }
    }, [methodParam]);

    const handleMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setMethod(selectedMethod);
        navigate(`/Integration/${selectedMethod}`);
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
              <option value="">Select Method</option>  
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