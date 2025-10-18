import React,{useState} from "react";
import './NumericalMethod/Method.css';

function Interpolation(){
    const[method,setMethod] = useState("graphical")

    const handleMethodChange = (e) => {
        setMethod(e.target.value)
    }

    const renderMethod = () =>{
        switch(method){
            case "newton-divide" :
                return(<NewtonDivided/>)
            case 'lagrange':
                return (<Lagrange/>)
            case 'spline':
                return (<Spline/>)
        }
    }

    return(
        <div>
            <select className='custom-select' value={method} onChange={handleMethodChange}>
              <option value="newton-divide">Newton divided-differences</option>
              <option value="lagrange">Lagrange Interpolation</option>
              <option value="spline">Spline Interpolation</option>
            </select>
            <div style={{padding: '2em'}}>
              {/*{renderMethod()}*/}
              <h2>ยังไม่เสร็จ 😭</h2>
            </div>
        </div>
    );
}

export default Interpolation