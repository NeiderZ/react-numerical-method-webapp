import React,{useState} from "react";
import './NumericalMethod/Method.css';
import Cramer from './NumericalMethod/LinearAlgebra/Cramer'
import Guass_Seidel from "./NumericalMethod/LinearAlgebra/Guass-Seidel";
import Jacobi from './NumericalMethod/LinearAlgebra/Jacobi'

function LinearAlgebra(){
    const[method,setMethod] = useState("cramer")

    const handleMethodChange = (e) => {
        setMethod(e.target.value)
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