import React,{useState} from "react";
import './NumericalMethod/Method.css';

function Extrapolation(){
    const[method,setMethod] = useState("graphical")

    const handleMethodChange = (e) => {
        setMethod(e.target.value)
    }

    const renderMethod = () =>{
        switch(method){
            case "SRE" :
                return(<SimpleRegression/>)
            case 'MRE':
                return (<MultipleRegression/>)
        }
    }

    return(
        <div>
            <select className='custom-select' value={method} onChange={handleMethodChange}>
              <option value="SRE">Simple Regression Extraoilation</option>
              <option value="MRE">Multiple Regression Extraoilation</option>
            </select>
            <div style={{padding: '2em'}}>
              {/*{renderMethod()}*/}
              <h2>ยังไม่เสร็จ 😭</h2>
            </div>
        </div>
    );
}

export default Extrapolation