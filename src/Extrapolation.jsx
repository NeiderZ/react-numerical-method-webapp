import React,{useState, useEffect} from "react";
import './NumericalMethod/Method.css';
import { useNavigate, useParams } from "react-router-dom";

function Extrapolation(){
    const navigate = useNavigate()
    const {methodParam} = useParams()
    const[method,setMethod] = useState(methodParam)

    return(
        <div>
            <div style={{padding: '2em'}}>
              <h2>ยังไม่เสร็จ 😭</h2>
            </div>
        </div>
    );
}

export default Extrapolation