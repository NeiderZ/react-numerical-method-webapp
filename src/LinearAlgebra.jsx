import React,{useEffect, useState} from "react";
import './NumericalMethod/Method.css';
import Cramer from './NumericalMethod/LinearAlgebra/Cramer'
import Guass_Seidel from "./NumericalMethod/LinearAlgebra/Guass-Seidel";
import Jacobi from './NumericalMethod/LinearAlgebra/Jacobi'
import { useNavigate, useParams } from "react-router-dom";

function LinearAlgebra(){
    const navigate = useNavigate()
    const {methodParam} = useParams()
    const[method,setMethod] = useState(methodParam)

    useEffect(() => {
        if(methodParam && methodParam !== method){
            setMethod(methodParam)
        }
    }, [methodParam])

    const handleMethodChange = (e) => {
        const selectedMethod = e.target.value
        setMethod(selectedMethod)
        navigate(`/LinearAlgebraEquation/${selectedMethod}`)
    }

    const renderMethod = () =>{
        switch(method){
            case "cramer" :
                return(<Cramer/>)
            case "guass-seidel" :
                return(<Guass_Seidel/>)
            case "jacobi" :
                return(<Jacobi/>)
        }
    }

    return(
        <div>
            <select className='custom-select' value={method} onChange={handleMethodChange}>
              <option value="">Select Method</option>  
              <option value="cramer">Cramer's Rule</option>
              <option value="guass-seidel">Guass-Seidel Iteration Method</option>
              <option value="jacobi">Jacobi Iteration Method</option>
            </select>
            <div style={{padding: '2em'}}>
              {renderMethod()}
            </div>
        </div>
    );
}

export default LinearAlgebra