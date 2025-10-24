import React,{useEffect, useState} from "react";
import './NumericalMethod/Method.css';
import { useNavigate, useParams } from "react-router-dom";
import Lagrance from "./NumericalMethod/Interpolation/Lagrange";

function Interpolation(){
    const navigate = useNavigate()
    const {methodParam} = useParams()
    const[method,setMethod] = useState("graphical")

    useEffect(() => {
        if (methodParam && methodParam !== method) {
            setMethod(methodParam);
        }
    }, [methodParam])

    const handleMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setMethod(selectedMethod);
        navigate(`/Interpolation/${selectedMethod}`);
    }

    const renderMethod = () =>{
        switch(method){
            // case "newton-divide" :
            //     return(<NewtonDivided/>)
            case 'lagrance':
                return (<Lagrance/>)
            // case 'spline':
            //     return (<Spline/>)
        }
    }

    return(
        <div>
            <select className='custom-select' value={method} onChange={handleMethodChange}>
              <option value="">Select Method</option>  
              {/* <option value="newton-divide">Newton divided-differences</option> */}
              <option value="lagrance">Lagrange Interpolation</option>
              {/* <option value="spline">Spline Interpolation</option> */}
            </select>
            <div style={{padding: '2em'}}>
              {renderMethod()}
            </div>
        </div>
    );
}

export default Interpolation